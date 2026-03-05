import { atom } from "nanostores"

export const editorCode = atom("")

class RustlingsDB {
	private dbPromise: Promise<IDBDatabase> | null = null
	private readonly DB_VERSION = 1
	private readonly STORE_CODE = "snippets"
	private readonly STORE_PROGRESS = "progress"
	lastLesson: Record<string, { slug: string; title: string }> = {}

	private initDB(): Promise<IDBDatabase> {
		if (this.dbPromise) return this.dbPromise

		this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
			const request = indexedDB.open("rustlings", this.DB_VERSION)

			request.onupgradeneeded = (e) => {
				const db = (e.target as IDBOpenDBRequest).result

				if (!db.objectStoreNames.contains(this.STORE_CODE)) {
					db.createObjectStore(this.STORE_CODE)
				}

				if (!db.objectStoreNames.contains(this.STORE_PROGRESS)) {
					db.createObjectStore(this.STORE_PROGRESS)
				}
			}

			request.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result)
			request.onerror = () => reject(new Error("Failed to open IndexedDB"))
		})

		return this.dbPromise
	}

	private async get<T>(store: string, key: string): Promise<T | null> {
		const db = await this.initDB()
		return new Promise((resolve) => {
			const request = db.transaction(store, "readonly").objectStore(store).get(key)
			request.onsuccess = () => resolve(request.result || null)
			request.onerror = () => resolve(null)
		})
	}

	private async set(store: string, key: string, value: unknown): Promise<void> {
		const db = await this.initDB()
		return new Promise((resolve, reject) => {
			const request = db.transaction(store, "readwrite").objectStore(store).put(value, key)
			request.onsuccess = () => resolve()
			request.onerror = () => reject(request.error)
		})
	}

	private async delete(store: string, key: string): Promise<void> {
		const db = await this.initDB()
		return new Promise((resolve, reject) => {
			const request = db.transaction(store, "readwrite").objectStore(store).delete(key)
			request.onsuccess = () => resolve()
			request.onerror = () => reject(request.error)
		})
	}

	async saveCode(slug: string, val: string) {
		await this.set(this.STORE_CODE, slug, val)
	}

	async getCode(slug: string): Promise<string | null> {
		return this.get<string>(this.STORE_CODE, slug)
	}

	async reset(slug: string) {
		await Promise.all([this.delete(this.STORE_CODE, slug), this.delete(this.STORE_PROGRESS, slug)])
	}

	async markCompleted(slug: string, courseId?: string) {
		await this.set(this.STORE_PROGRESS, slug, true)
		if (courseId) {
			fetch("/api/progress/complete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ courseId, slug }),
			}).catch(() => {})
		}
	}

	async isCompleted(slug: string): Promise<boolean> {
		return (await this.get<boolean>(this.STORE_PROGRESS, slug)) || false
	}

	/** Clear all local data (called on logout) */
	async clearAll(): Promise<void> {
		const db = await this.initDB()
		await Promise.all([
			new Promise<void>((resolve) => {
				const req = db.transaction(this.STORE_CODE, "readwrite").objectStore(this.STORE_CODE).clear()
				req.onsuccess = () => resolve()
				req.onerror = () => resolve()
			}),
			new Promise<void>((resolve) => {
				const req = db.transaction(this.STORE_PROGRESS, "readwrite").objectStore(this.STORE_PROGRESS).clear()
				req.onsuccess = () => resolve()
				req.onerror = () => resolve()
			}),
		])
	}

	/** Load server-side completions + last lesson positions into local state (for logged-in users) */
	async syncFromServer(): Promise<void> {
		try {
			const res = await fetch("/api/progress")
			if (!res.ok) return
			const { progress, lastLesson } = (await res.json()) as {
				progress: Record<string, string[]>
				lastLesson: Record<string, { slug: string; title: string }>
			}
			for (const slugs of Object.values(progress)) {
				for (const slug of slugs) {
					await this.set(this.STORE_PROGRESS, slug, true)
				}
			}
			this.lastLesson = lastLesson ?? {}
		} catch {
			// ignore — user may be offline or not logged in
		}
	}
}

export const db = new RustlingsDB()
