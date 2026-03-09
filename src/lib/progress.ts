const STORAGE_KEY = "rustlings_progress"

type Progress = Record<string, string[]>

export function getProgress(): Progress {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Progress
	} catch {
		return {}
	}
}

export function markLessonVisited(trackId: string, slug: string): void {
	const progress = getProgress()
	const visited = progress[trackId] ?? []
	if (!visited.includes(slug)) {
		progress[trackId] = [...visited, slug]
		localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
	}
}

export function getTrackProgress(trackId: string): string[] {
	return getProgress()[trackId] ?? []
}
