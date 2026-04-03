export type TrackBadgeKey = "track.badge.beginner" | "track.badge.advanced"

// Track
export type Track = {
	id: string
	title: string
	description: string
	href: string
	lessons: number
	badge: TrackBadgeKey
	disabled: boolean
	slugs: string[]
}
