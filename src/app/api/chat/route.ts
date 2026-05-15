import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, equipo, marca, problema } = await req.json();

    const systemPrompt = "Eres un asistente técnico especializado en equipos dentales de las marcas 3Shape, SprintRay, VHF y Profeta. Tu objetivo es ayudar a resolver problemas técnicos paso a paso ANTES de escalar con un técnico humano.\n\n" +
      "Equipo afectado: " + equipo + "\nMarca: " + marca + "\nProblema reportado: " + problema + "\n\n" +
      "Reglas:\n- Responde siempre en español\n- Da pasos concretos y numerados\n- Si el problema es de software, guía con capturas o menús específicos\n- Si es hardware, indica si requiere revisión física\n- Máximo 3 intentos de solución antes de sugerir escalar\n- Sé empático, el cliente puede ser personal de clínica dental sin conocimiento técnico";

    const historial = messages.map((m: { role: string; content: string }) => {
      const label = m.role === "user" ? "Usuario" : "Asistente";
      return label + ": " + m.content;
    }).join("\n\n");

    const inputCompleto = "Sistema: " + systemPrompt + "\n\n" + historial + "\n\nAsistente:";

    const xaiResponse = await fetch("https://api.x.ai/v1/responses", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.XAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-4.20-reasoning",
        input: inputCompleto,
      }),
    });

    if (!xaiResponse.ok) {
      const errorText = await xaiResponse.text();
      return NextResponse.json({ error: "Error en xAI API", details: errorText }, { status: 502 });
    }

    const data = await xaiResponse.json();

    let reply = "";
    if (data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.content && Array.isArray(item.content)) {
          for (const block of item.content) {
            if (block.text) reply += block.text;
          }
        }
        if (item.type === "message" && item.content?.[0]?.text) {
          reply = item.content[0].text;
        }
      }
    }

    if (!reply && data.output?.[0]?.content?.[0]?.text) {
      reply = data.output[0].content[0].text;
    }

    if (!reply) {
      reply = "Lo siento, no pude procesar tu mensaje. Intenta de nuevo.";
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}