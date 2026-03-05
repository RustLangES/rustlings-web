import { generateId } from "./auth/crypto"

export interface SectionCompletion {
	slug: string
	courseId: string
	completedAt: string
}

export interface CourseProgress {
	courseId: string
	completed: boolean
	progressPercentage: number
	startedAt: string | null
	completedAt: string | null
}

/** Returns all completed lesson slugs for a user, grouped by courseId */
export async function getUserProgress(db: D1Database, userId: string): Promise<Record<string, string[]>> {
	const rows = await db
		.prepare(
			`SELECT cs.slug, cs.course_id
       FROM user_section_progress usp
       JOIN course_sections cs ON cs.id = usp.section_id
       WHERE usp.user_id = ?`,
		)
		.bind(userId)
		.all<{ slug: string; course_id: string }>()

	const result: Record<string, string[]> = {}
	for (const row of rows.results) {
		if (!result[row.course_id]) result[row.course_id] = []
		result[row.course_id].push(row.slug)
	}
	return result
}

/**
 * Marks a lesson (section) as completed for a user.
 * Also updates the user_course_progress percentage.
 */
export async function markSectionCompleted(
	db: D1Database,
	userId: string,
	courseId: string,
	slug: string,
): Promise<void> {
	const sectionId = `${courseId}-${slug}`

	// Upsert section completion
	const now = new Date().toISOString()
	const completionId = generateId()
	await db
		.prepare(
			`INSERT INTO user_section_progress (id, user_id, section_id, completed, completed_at)
       VALUES (?, ?, ?, 1, ?)
       ON CONFLICT (user_id, section_id) DO NOTHING`,
		)
		.bind(completionId, userId, sectionId, now)
		.run()

	// Recalculate course progress
	const [totalRow, completedRow] = await Promise.all([
		db
			.prepare("SELECT COUNT(*) as cnt FROM course_sections WHERE course_id = ?")
			.bind(courseId)
			.first<{ cnt: number }>(),
		db
			.prepare(
				`SELECT COUNT(*) as cnt
         FROM user_section_progress usp
         JOIN course_sections cs ON cs.id = usp.section_id
         WHERE usp.user_id = ? AND cs.course_id = ?`,
			)
			.bind(userId, courseId)
			.first<{ cnt: number }>(),
	])

	const total = totalRow?.cnt ?? 0
	const completed = completedRow?.cnt ?? 0
	const pct = total > 0 ? Math.round((completed / total) * 100) : 0
	const isComplete = pct === 100

	const progressId = generateId()
	await db
		.prepare(
			`INSERT INTO user_course_progress
         (id, user_id, course_id, completed, progress_percentage, started_at, completed_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (user_id, course_id) DO UPDATE SET
         completed = excluded.completed,
         progress_percentage = excluded.progress_percentage,
         completed_at = excluded.completed_at,
         updated_at = excluded.updated_at`,
		)
		.bind(progressId, userId, courseId, isComplete ? 1 : 0, pct, now, isComplete ? now : null, now)
		.run()
}
