import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { SERVICES, STATS } from "@/lib/constants";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Fallback if no OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "API key missing. Please add OPENAI_API_KEY to your .env.local file to enable AI responses."
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare context for the AI
    const systemPrompt = `
      You are the official AI assistant for SK Digital, a premium web development agency.
      Your tone is professional, helpful, confident, and concise.

      Here is some information about the agency:
      - Services: ${SERVICES.map(s => s.title).join(", ")}.
      - Stats: ${STATS.map(s => `${s.value}${s.suffix} ${s.label}`).join(", ")}.
      
      Guidelines:
      - Keep responses under 3 paragraphs.
      - If asked about pricing or starting a project, encourage them to use the Contact form or Book a Call button on the website.
      - Do not make up services we don't offer. If asked for something outside our scope, politely decline and mention our core services.
      - Format lists cleanly.
    `;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
