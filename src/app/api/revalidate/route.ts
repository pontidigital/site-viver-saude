import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path } = body as { secret?: string; path?: string };

    // Validate secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return Response.json({ error: "Token inválido" }, { status: 401 });
    }

    if (!path) {
      return Response.json(
        { error: "Path é obrigatório" },
        { status: 400 }
      );
    }

    revalidatePath(path);

    return Response.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidate error:", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
