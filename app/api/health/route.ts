import { getDatabase } from "@/lib/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET(): Response {
  try {
    getDatabase().prepare("SELECT 1").get();

    return Response.json({
      database: {
        connected: true,
      },
      ok: true,
    });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected database error";

    return Response.json(
      {
        database: {
          connected: false,
        },
        error: message,
        ok: false,
      },
      { status: 503 },
    );
  }
}
