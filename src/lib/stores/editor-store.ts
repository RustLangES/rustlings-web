import { atom } from "nanostores"

export const editorCode = atom("")

// In-memory progress tracking (resets on page reload)
// Server-side progress is handled via API calls
class ServerProgressStore {
	lastLesson: Record<string, { slug: string; title: string }> = {}
	private completedLessons: Set<string> = new Set()

	/** Records that the user visited this lesson (fire-and-forget for logged-in users) */
	visitLesson(slug: string, courseId: string) {
		this.lastLesson[courseId] = { slug, title: slug }
		fetch("/api/progress/visit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ courseId, slug }),
		}).catch(() => {})
	}

	async markCompleted(slug: string, courseId?: string) {
		this.completedLessons.add(slug)
		if (courseId) {
			fetch("/api/progress/complete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ courseId, slug }),
			}).catch(() => {})
		}
	}

	async isCompleted(slug: string): Promise<boolean> {
		return this.completedLessons.has(slug)
	}

	async reset(slug: string) {
		this.completedLessons.delete(slug)
	}

	/** Clear all local data (called on logout) */
	async clearAll(): Promise<void> {
		this.completedLessons.clear()
		this.lastLesson = {}
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
					this.completedLessons.add(slug)
				}
			}
			this.lastLesson = lastLesson ?? {}
		} catch {
			// ignore — user may be offline or not logged in
		}
	}
}

export const db = new ServerProgressStore()
