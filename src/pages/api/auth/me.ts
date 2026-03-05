import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { DB } = locals.runtime.env;
  const row = await DB.prepare(
    "SELECT full_name, full_name_locked FROM users WHERE id = ?",
  )
    .bind(user.id)
    .first<{ full_name: string | null; full_name_locked: number }>();

  return new Response(
    JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: row?.full_name ?? null,
      },
      full_name_locked: !!row?.full_name_locked,
    }),
    { status: 200 },
  );
};
