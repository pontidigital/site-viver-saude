import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

const systemPrompts: Record<string, string> = {
  geral: `Você é um assistente de IA para a empresa Viver Saúde, uma operadora de planos de saúde.
Responda perguntas sobre estratégia de negócios, marketing, operações e gestão.
Sempre responda em português brasileiro de forma profissional e útil.
Seja conciso mas completo nas respostas.`,

  copywriting: `Você é um especialista em copywriting para a empresa Viver Saúde, uma operadora de planos de saúde.
Crie textos persuasivos para marketing digital, redes sociais, blog posts, emails e landing pages.
Use técnicas de copywriting como AIDA, PAS e storytelling.
Sempre escreva em português brasileiro com tom profissional mas acessível.
Foque nos benefícios dos planos de saúde e na qualidade de vida dos clientes.`,

  ux: `Você é um especialista em UX/UI design para a empresa Viver Saúde, uma operadora de planos de saúde.
Forneça sugestões para melhorar a experiência do usuário no site e aplicativos.
Considere acessibilidade, usabilidade, arquitetura de informação e design visual.
Sempre responda em português brasileiro.
Baseie suas sugestões em melhores práticas de UX e dados de pesquisa quando possível.`,
};

export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { messages, mode } = body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
      mode: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Mensagens são obrigatórias" },
        { status: 400 }
      );
    }

    // Validate message content length to prevent abuse
    const MAX_MESSAGE_LENGTH = 10000;
    const MAX_MESSAGES = 50;
    if (messages.length > MAX_MESSAGES) {
      return Response.json(
        { error: "Limite de mensagens excedido" },
        { status: 400 }
      );
    }
    for (const msg of messages) {
      if (
        typeof msg.content !== "string" ||
        msg.content.length > MAX_MESSAGE_LENGTH
      ) {
        return Response.json(
          { error: "Mensagem inválida ou muito longa" },
          { status: 400 }
        );
      }
      if (msg.role !== "user" && msg.role !== "assistant") {
        return Response.json(
          { error: "Role de mensagem inválido" },
          { status: 400 }
        );
      }
    }

    const systemPrompt = systemPrompts[mode] ?? systemPrompts.geral;

    const anthropic = new Anthropic();

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    // Create a ReadableStream from the Anthropic stream
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                new TextEncoder().encode(event.delta.text)
              );
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("AI Chat API error:", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
