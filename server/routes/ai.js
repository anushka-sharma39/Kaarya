import express from 'express';

const router = express.Router();

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Ye naam aapki workers.js ke "service" values se exactly match hote hain
const SERVICES = [
  'Plumbing', 'Electrical', 'AC Repair', 'Refrigerator Repair',
  'Washing Machine Repair', 'Machinery Repair', 'Painting',
  'Car Painting', 'Carpenter', 'Appliance Repair',
];

const LANG_NAMES = {
  en: 'English',
  hi: 'Hindi (Devanagari script)',
  ta: 'Tamil (Tamil script)',
  mr: 'Marathi (Devanagari script)',
};

// Simple rate limit: ek IP se 10 requests per minute
const hits = new Map();
const limiter = (req, res, next) => {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 10) {
    return res.status(429).json({ error: 'Too many requests. Try again in a minute.' });
  }
  recent.push(now);
  hits.set(req.ip, recent);
  next();
};

router.post('/diagnose', limiter, async (req, res) => {
  const { text, language = 'en' } = req.body || {};

  if (typeof text !== 'string' || !text.trim() || text.length > 1000) {
    return res.status(400).json({ error: 'Please describe the problem (max 1000 characters).' });
  }
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'Server is missing GROQ_API_KEY.' });
  }

  const outLang = LANG_NAMES[language] || 'English';
  const system = `You diagnose household repair problems for an Indian home-services app.
The user may write in English, Hindi or Hinglish.
Reply with ONLY a JSON object with exactly these keys:
{
  "problemDetected": short description of the likely problem,
  "recommendedService": one of ${JSON.stringify(SERVICES)},
  "urgency": "low" | "medium" | "high",
  "suggestedAction": one short sentence of advice for the customer
}
Write problemDetected and suggestedAction in ${outLang}.
Keep recommendedService and urgency exactly as specified (English).
Use "high" for water leaks, sparks, burning smell, gas or shock risk.`;

  try {
    const r = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_TEXT_MODEL || 'llama-3.3-70b-versatile',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: text.trim() },
        ],
      }),
    });

    if (!r.ok) {
      console.error('Groq error:', r.status, await r.text());
      return res.status(502).json({ error: 'AI service error.' });
    }

    const data = await r.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    // AI ka output seedha mat maano, validate karo
    res.json({
      problemDetected: String(parsed.problemDetected || '').slice(0, 200),
      recommendedService: SERVICES.includes(parsed.recommendedService)
        ? parsed.recommendedService
        : 'Appliance Repair',
      urgency: ['low', 'medium', 'high'].includes(parsed.urgency) ? parsed.urgency : 'medium',
      suggestedAction: String(parsed.suggestedAction || '').slice(0, 300),
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Could not analyze the problem.' });
  }
});

export default router;