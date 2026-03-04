export type TrackBadgeKey = "track.badge.beginner" | "track.badge.advanced"

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
