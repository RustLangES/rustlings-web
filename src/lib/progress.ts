type Progress = Record<string, string[]>

export function getProgress(): Progress {
	return {}
}

export function markLessonVisited(_trackId: string, _slug: string): void {}

export function getTrackProgress(_trackId: string): string[] {
	return []
}
