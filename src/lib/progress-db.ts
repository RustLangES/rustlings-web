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

export interface LastLessonInfo {
	slug: string
	title: string
}

/** Returns the last visited lesson per course for a user */
export async function getLastLessons(db: D1Database, userId: string): Promise<Record<string, LastLessonInfo>> {
	const rows = await db
		.prepare(
			`SELECT ucp.course_id, ucp.last_lesson_slug, cs.title
       FROM user_course_progress ucp
       LEFT JOIN course_sections cs ON cs.course_id = ucp.course_id AND cs.slug = ucp.last_lesson_slug
       WHERE ucp.user_id = ? AND ucp.last_lesson_slug IS NOT NULL`,
		)
		.bind(userId)
		.all<{ course_id: string; last_lesson_slug: string; title: string | null }>()

	const result: Record<string, LastLessonInfo> = {}
	for (const row of rows.results) {
		result[row.course_id] = { slug: row.last_lesson_slug, title: row.title ?? row.last_lesson_slug }
	}
	return result
}

/** Updates the last visited lesson for a user in a course */
export async function updateLastLesson(db: D1Database, userId: string, courseId: string, slug: string): Promise<void> {
	const now = new Date().toISOString()
	const id = generateId()
	await db
		.prepare(
			`INSERT INTO user_course_progress
         (id, user_id, course_id, completed, progress_percentage, started_at, last_lesson_slug, last_lesson_at, updated_at)
       VALUES (?, ?, ?, 0, 0, ?, ?, ?, ?)
       ON CONFLICT (user_id, course_id) DO UPDATE SET
         last_lesson_slug = excluded.last_lesson_slug,
         last_lesson_at = excluded.last_lesson_at,
         updated_at = excluded.updated_at`,
		)
		.bind(id, userId, courseId, now, slug, now, now)
		.run()
}

/**
 * Returns all slugs the user has reached (position ≤ furthest completed), grouped by courseId.
 * With the new schema, one row per (user, course) tracks the furthest section reached.
 */
export async function getUserProgress(db: D1Database, userId: string): Promise<Record<string, string[]>> {
	const rows = await db
		.prepare(
			`SELECT cs_all.slug, usp.course_id
       FROM user_section_progress usp
       JOIN course_sections cs_current
         ON cs_current.course_id = usp.course_id AND cs_current.slug = usp.section_slug
       JOIN course_sections cs_all
         ON cs_all.course_id = usp.course_id AND cs_all.position <= cs_current.position
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
 * Stores only the furthest section reached per (user, course).
 * Also updates the user_course_progress percentage.
 */
export async function markSectionCompleted(
	db: D1Database,
	userId: string,
	courseId: string,
	slug: string,
): Promise<void> {
	const now = new Date().toISOString()
	const id = generateId()

	// Upsert: one row per (user, course). Advance section_slug only if new position >= current.
	await db
		.prepare(
			`INSERT INTO user_section_progress (id, user_id, course_id, section_slug, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT (user_id, course_id) DO UPDATE SET
         section_slug = (
           SELECT slug FROM course_sections
           WHERE course_id = excluded.course_id
             AND slug IN (excluded.section_slug, user_section_progress.section_slug)
           ORDER BY position DESC
           LIMIT 1
         ),
         updated_at = excluded.updated_at`,
		)
		.bind(id, userId, courseId, slug, now)
		.run()

	// Recalculate progress from position of furthest section
	const progressRow = await db
		.prepare(
			`SELECT cs.position,
              (SELECT COUNT(*) FROM course_sections WHERE course_id = ?) AS total
       FROM user_section_progress usp
       JOIN course_sections cs ON cs.course_id = usp.course_id AND cs.slug = usp.section_slug
       WHERE usp.user_id = ? AND usp.course_id = ?`,
		)
		.bind(courseId, userId, courseId)
		.first<{ position: number; total: number }>()

	const position = progressRow?.position ?? 0
	const total = progressRow?.total ?? 0
	const pct = total > 0 ? Math.round((position / total) * 100) : 0
	const isComplete = position === total && total > 0

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
