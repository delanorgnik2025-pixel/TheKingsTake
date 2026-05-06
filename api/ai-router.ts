import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";

async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key not configured. Add OPENAI_API_KEY to your .env file.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content ?? "No response generated.";
}

async function callGoogleAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("Google AI API key not configured. Add GOOGLE_AI_API_KEY to your .env file.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google AI API error: ${error}`);
  }

  const data = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text ?? "No response generated.";
}

export const aiRouter = createRouter({
  generateLegalDocument: adminQuery
    .input(z.object({
      documentType: z.string(),
      jurisdiction: z.string().optional(),
      details: z.string().optional(),
      provider: z.enum(["openai", "google"]).default("openai"),
    }))
    .mutation(async ({ input }) => {
      const systemPrompt = `You are a professional legal document assistant specializing in U.S. criminal law. Generate properly formatted legal documents with correct legal language, case citations where appropriate, and clear placeholder fields marked in [BRACKETS] for the user to fill in (e.g., [DEFENDANT NAME], [CASE NUMBER], [COURT NAME], [DATE], [ATTORNEY NAME]). Use formal legal terminology. Include proper headings, numbered paragraphs, and signature blocks. Format as plain text.`;

      const userPrompt = input.details
        ? `Generate a ${input.documentType}${input.jurisdiction ? ` for ${input.jurisdiction} jurisdiction` : ""}. Additional context: ${input.details}`
        : `Generate a ${input.documentType}${input.jurisdiction ? ` for ${input.jurisdiction} jurisdiction` : ""}.`;

      const result = input.provider === "openai"
        ? await callOpenAI(systemPrompt, userPrompt)
        : await callGoogleAI(systemPrompt, userPrompt);

      return { content: result, documentType: input.documentType };
    }),

  generateBlogIdeas: adminQuery
    .input(z.object({
      topic: z.string(),
      count: z.number().min(1).max(20).default(5),
    }))
    .mutation(async ({ input }) => {
      const systemPrompt = `You are a content strategist for an African American advocacy platform called #TheKingsTake. Generate compelling, thought-provoking blog post titles that address issues of legal empowerment, social justice, community building, and Black excellence. Make titles engaging and shareable.`;

      const userPrompt = `Generate ${input.count} blog post title ideas about: ${input.topic}. Return each title on a new line with no numbering or bullets.`;

      const result = await callOpenAI(systemPrompt, userPrompt).catch(() =>
        callGoogleAI(systemPrompt, userPrompt)
      );

      const ideas = result.split("\n").filter(line => line.trim().length > 0);
      return { ideas };
    }),
});
