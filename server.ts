import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('[BioSphere Explorer] Gemini AI initialized successfully.');
  } catch (err) {
    console.warn('[BioSphere Explorer] Warning: Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.log('[BioSphere Explorer] Running in local/offline fallback mode (GEMINI_API_KEY not configured).');
}

// 1. Ask BioSphere AI Endpoint
app.post('/api/gemini/ask', async (req: Request, res: Response) => {
  const { question, organismName, age = 9, context = '' } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const ageNum = parseInt(age, 10) || 9;
  let ageGuideline = '';
  if (ageNum <= 7) {
    ageGuideline = 'The child is 5-7 years old. Use very simple, friendly words, short clear sentences, high enthusiasm, and fun relatable analogies (like toys or family). Avoid complex jargon.';
  } else if (ageNum <= 10) {
    ageGuideline = 'The child is 8-10 years old. Introduce real biological concepts (habitat, diet, adaptations, life cycle) with clear explanations and exciting facts.';
  } else if (ageNum <= 13) {
    ageGuideline = 'The student is 11-13 years old. Use proper scientific terminology, taxonomy, ecological relationships, food web roles, and conservation insights.';
  } else {
    ageGuideline = 'The student is 14-15 years old. Use advanced biological, physiological, and evolutionary terminology, anatomical details, and conservation science rigor.';
  }

  if (ai) {
    try {
      const prompt = `You are BioSphere Explorer AI, an encouraging and scientifically accurate nature guide for young explorers.
Audience: ${ageGuideline}
Organism Context: ${organismName || 'General Living Organisms'}
Additional Info: ${context}

Child's Question: "${question}"

Instructions:
- Provide a scientifically accurate, age-adapted explanation.
- Keep the response concise, engaging, and structured (under 180 words).
- End with one inspiring curiosity question or fun observation to encourage further scientific exploration.
- Never invent unverified facts, fake population counts, or false conservation statuses.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({
        answer: response.text || 'That is a wonderful question about living organisms! Explore more in our encyclopedia.',
        source: 'gemini',
        model: 'gemini-3.8-flash',
      });
    } catch (err: any) {
      console.warn('[Gemini API Error]', err?.message || err);
      // Fall through to fallback
    }
  }

  // Graceful scientifically sound local fallback
  let fallbackAnswer = '';
  if (ageNum <= 7) {
    fallbackAnswer = `Great question about ${organismName || 'living creatures'}! Living things have special body parts and behaviors called adaptations that help them eat, breathe, stay warm or cool, and stay safe in their natural homes. Keep exploring with your curious eyes!`;
  } else if (ageNum <= 10) {
    fallbackAnswer = `That is an insightful question about ${organismName || 'this organism'}! In biology, every living species has evolved specialized traits suited to its ecosystem—from specialized breathing systems to unique ways of communicating and hunting.`;
  } else {
    fallbackAnswer = `Fascinating biological inquiry regarding ${organismName || 'this taxon'}. Evolutionary adaptations allow organisms to fill specific ecological niches, balancing physiological energy budgets with environmental survival pressures.`;
  }

  return res.json({
    answer: fallbackAnswer,
    source: 'fallback',
  });
});

// 2. Generate Age-Adapted Story
app.post('/api/gemini/story', async (req: Request, res: Response) => {
  const { organismName, age = 9 } = req.body;
  const ageNum = parseInt(age, 10) || 9;

  if (ai && organismName) {
    try {
      const prompt = `Write a short, engaging, scientifically accurate educational story (150-250 words) featuring ${organismName} for a ${ageNum}-year-old child.
The story must:
- Highlight genuine natural behaviors, habitat, and adaptations of ${organismName}.
- Be age-appropriate and inspiring.
- Avoid fantasy elements (animals shooting lasers); focus on real animal wonders.
- Include a title and a 1-sentence scientific takeaway.
Format as JSON: { "title": string, "content": string, "scientificLesson": string }`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ ...parsed, source: 'gemini' });
      }
    } catch (err) {
      console.warn('[Gemini Story Error]', err);
    }
  }

  return res.json({
    title: `A Day in the Life of ${organismName || 'the Explorer'}`,
    content: `Under the gentle sunlight of the natural habitat, ${organismName || 'the creature'} moved quietly through its home. Every sense was attuned to the surroundings, from the rustle of leaves to ripples in the water. By respecting the natural rhythm of its ecosystem, it thrived alongside its family and neighbors in the living biosphere.`,
    scientificLesson: `Every living organism has evolved distinct adaptations that keep its natural ecosystem in harmony.`,
    source: 'fallback',
  });
});

// 3. Compare Organisms Endpoint
app.post('/api/gemini/compare', async (req: Request, res: Response) => {
  const { organismA, organismB, age = 9 } = req.body;
  const ageNum = parseInt(age, 10) || 9;

  if (ai && organismA && organismB) {
    try {
      const prompt = `Compare two living organisms: "${organismA}" vs "${organismB}" for an audience of age ${ageNum}.
Provide:
1. One key similarity (1-2 sentences)
2. Three key differences in habitat, anatomy, or diet
3. An interesting surprising fact comparing them
Format response as JSON:
{
  "keySimilarity": string,
  "differences": string[],
  "surprisingFact": string
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ ...parsed, source: 'gemini' });
      }
    } catch (err) {
      console.warn('[Gemini Compare Error]', err);
    }
  }

  return res.json({
    keySimilarity: `Both ${organismA || 'Organism A'} and ${organismB || 'Organism B'} are remarkable examples of biodiversity, playing essential roles in their respective food chains.`,
    differences: [
      `Different environmental niches and habitat distributions across Earth's biomes.`,
      `Distinct adaptations in locomotion and respiratory mechanisms.`,
      `Variations in diet, trophic level, and social group behaviors.`,
    ],
    surprisingFact: `Despite their outward differences, all living organisms share fundamental genetic and cellular processes inherited across billions of years of life on Earth.`,
    source: 'fallback',
  });
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BioSphere Explorer] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
