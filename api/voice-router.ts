import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

/**
 * Eleven Labs Voice Synthesis Router
 * Transforms courtroom dialogue into spoken audio with distinct character voices
 */

// Voice persona definitions for courtroom characters
// Using Eleven Labs voice IDs - these map to pre-configured voices
export const VOICE_PERSONAS = {
  // Judges - authoritative, measured, commanding
  judge_strict: {
    voiceId: "pNInz6obpgDQGcFmaJgB", // Adam - deep, authoritative male
    name: "Judge Harding",
    role: "Judge",
    personality: "Strict, by-the-book, no-nonsense",
    settings: { stability: 0.75, similarity_boost: 0.85, style: 0.3 }
  },
  judge_lenient: {
    voiceId: "XB0fDUnXU5powFXDhCwa", // Charlotte - warm, maternal female
    name: "Judge Mercer",
    role: "Judge",
    personality: "Fair, understanding, patient",
    settings: { stability: 0.65, similarity_boost: 0.7, style: 0.5 }
  },
  judge_hostile: {
    voiceId: "onwK4e9ZLuTAKqWW03F9", // Daniel - gruff, impatient male
    name: "Judge Grayson",
    role: "Judge",
    personality: "Hostile, dismissive, quick-tempered",
    settings: { stability: 0.4, similarity_boost: 0.9, style: 0.7 }
  },
  // Prosecutors - aggressive, confident, sharp
  prosecutor_aggressive: {
    voiceId: "TxGEqnHWrfWFTfGW9XjX", // Josh - intense, forceful male
    name: "ADA Marcus Webb",
    role: "Prosecutor",
    personality: "Aggressive, relentless, sharp-tongued",
    settings: { stability: 0.6, similarity_boost: 0.8, style: 0.6 }
  },
  prosecutor_measured: {
    voiceId: "MF3mGyEYCl7XYWbV9V6O", // Elli - calm, calculating female
    name: "ADA Sarah Chen",
    role: "Prosecutor",
    personality: "Methodical, precise, quietly intense",
    settings: { stability: 0.8, similarity_boost: 0.75, style: 0.2 }
  },
  // Defense attorneys - persuasive, passionate, strategic
  defense_passionate: {
    voiceId: "IKne3meq5aSn9XLyUdCD", // Clyde - charismatic, warm male
    name: "Attorney David Cole",
    role: "Defense Attorney",
    personality: "Passionate, charismatic, jury-friendly",
    settings: { stability: 0.55, similarity_boost: 0.8, style: 0.65 }
  },
  defense_strategic: {
    voiceId: "Xb7hH8MSUJpSbSDYk0k2", // Alice - sharp, intellectual female
    name: "Attorney Maya Johnson",
    role: "Defense Attorney",
    personality: "Strategic, intellectual, meticulous",
    settings: { stability: 0.85, similarity_boost: 0.7, style: 0.15 }
  },
  // Witnesses - varied emotional states
  witness_nervous: {
    voiceId: "LcfcDJNUP1GQjkzn1xUU", // Emily - soft, timid female
    name: "Witness",
    role: "Witness",
    personality: "Nervous, hesitant, easily flustered",
    settings: { stability: 0.3, similarity_boost: 0.6, style: 0.4 }
  },
  witness_confident: {
    voiceId: "bVMeCyTHy58xNoL34h3p", // Jeremy - bold, assured male
    name: "Witness",
    role: "Witness",
    personality: "Confident, direct, unshakeable",
    settings: { stability: 0.7, similarity_boost: 0.85, style: 0.5 }
  },
  witness_hostile: {
    voiceId: "nPczCjzI2devNBz1zQrb", // Brian - cold, defensive male
    name: "Witness",
    role: "Witness",
    personality: "Hostile, evasive, confrontational",
    settings: { stability: 0.45, similarity_boost: 0.9, style: 0.8 }
  },
  // Court officer / Bailiff
  bailiff: {
    voiceId: "pNInz6obpgDQGcFmaJgB", // Adam - neutral, official male
    name: "Bailiff",
    role: "Court Officer",
    personality: "Formal, procedural, neutral",
    settings: { stability: 0.9, similarity_boost: 0.5, style: 0.0 }
  },
  // Narrator / System voice
  narrator: {
    voiceId: "XB0fDUnXU5powFXDhCwa", // Charlotte - clear, professional female
    name: "Court Reporter",
    role: "Narrator",
    personality: "Clear, professional, neutral",
    settings: { stability: 0.8, similarity_boost: 0.6, style: 0.1 }
  }
} as const;

export type VoicePersonaKey = keyof typeof VOICE_PERSONAS;

export const voiceRouter = createRouter({
  // Get all available voice personas
  listPersonas: publicQuery.query(() => {
    return Object.entries(VOICE_PERSONAS).map(([key, persona]) => ({
      key,
      name: persona.name,
      role: persona.role,
      personality: persona.personality,
    }));
  }),

  // Synthesize courtroom dialogue to speech
  synthesize: publicQuery
    .input(
      z.object({
        text: z.string().min(1).max(5000),
        personaKey: z.string(),
        outputFormat: z.enum(["mp3", "wav", "ogg"]).default("mp3"),
      })
    )
    .mutation(async ({ input }) => {
      const apiKey = process.env.ELEVEN_LABS_API_KEY;
      if (!apiKey) {
        return {
          success: false,
          error: "Eleven Labs API key not configured. Add ELEVEN_LABS_API_KEY to your environment variables.",
          audioUrl: null,
        };
      }

      const persona = VOICE_PERSONAS[input.personaKey as VoicePersonaKey];
      if (!persona) {
        return {
          success: false,
          error: `Unknown persona: ${input.personaKey}`,
          audioUrl: null,
        };
      }

      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${persona.voiceId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": apiKey,
            },
            body: JSON.stringify({
              text: input.text,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: persona.settings.stability,
                similarity_boost: persona.settings.similarity_boost,
                style: persona.settings.style,
                use_speaker_boost: true,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          return {
            success: false,
            error: errorData.detail?.message || `Eleven Labs API error: ${response.status}`,
            audioUrl: null,
          };
        }

        const audioBuffer = await response.arrayBuffer();
        const base64Audio = Buffer.from(audioBuffer).toString("base64");
        const mimeType = input.outputFormat === "wav" ? "audio/wav" : input.outputFormat === "ogg" ? "audio/ogg" : "audio/mpeg";

        return {
          success: true,
          error: null,
          audioUrl: `data:${mimeType};base64,${base64Audio}`,
          persona: {
            name: persona.name,
            role: persona.role,
            personality: persona.personality,
          },
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error during voice synthesis",
          audioUrl: null,
        };
      }
    }),

  // Stream courtroom dialogue (for real-time simulation)
  streamDialogue: publicQuery
    .input(
      z.object({
        text: z.string().min(1).max(5000),
        personaKey: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const apiKey = process.env.ELEVEN_LABS_API_KEY;
      if (!apiKey) {
        return {
          success: false,
          error: "Eleven Labs API key not configured",
          streamUrl: null,
        };
      }

      const persona = VOICE_PERSONAS[input.personaKey as VoicePersonaKey];
      if (!persona) {
        return {
          success: false,
          error: `Unknown persona: ${input.personaKey}`,
          streamUrl: null,
        };
      }

      // Return stream configuration - client connects to WebSocket or polls
      return {
        success: true,
        error: null,
        streamUrl: `https://api.elevenlabs.io/v1/text-to-speech/${persona.voiceId}/stream`,
        voiceSettings: persona.settings,
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
      };
    }),

  // Get voice preview (short sample for selection UI)
  preview: publicQuery
    .input(z.object({ personaKey: z.string() }))
    .query(({ input }) => {
      const persona = VOICE_PERSONAS[input.personaKey as VoicePersonaKey];
      if (!persona) {
        return { success: false, error: "Unknown persona" };
      }
      return {
        success: true,
        persona: {
          key: input.personaKey,
          name: persona.name,
          role: persona.role,
          personality: persona.personality,
          settings: persona.settings,
        },
        sampleText: getSampleLine(input.personaKey as VoicePersonaKey),
      };
    }),
});

// Sample dialogue lines for each persona
function getSampleLine(personaKey: VoicePersonaKey): string {
  const samples: Record<VoicePersonaKey, string> = {
    judge_strict: "Order in the court. The defendant will rise. This court is now in session.",
    judge_lenient: "Please, everyone be seated. Let's proceed calmly and give everyone a fair hearing.",
    judge_hostile: "I've heard enough. Counsel, get to the point or I'll hold you in contempt.",
    prosecutor_aggressive: "The evidence will show, beyond any shadow of a doubt, that the defendant is guilty!",
    prosecutor_measured: "Let us examine the facts methodically. Each piece of evidence tells a story.",
    defense_passionate: "My client is innocent! The prosecution's case is built on speculation, not fact!",
    defense_strategic: "The burden of proof rests entirely with the state. And they have failed to meet it.",
    witness_nervous: "I... I think I saw something. It was dark and I was scared. I'm not sure.",
    witness_confident: "I saw exactly what happened. The defendant was there. I have no doubt.",
    witness_hostile: "I don't have to answer that. This is ridiculous. I want my lawyer.",
    bailiff: "All rise. The Honorable Judge presiding. Court is now in session.",
    narrator: "The courtroom falls silent as the jury files in. The trial is about to begin.",
  };
  return samples[personaKey] || "Welcome to the courtroom.";
}
