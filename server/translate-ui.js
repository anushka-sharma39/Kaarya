import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// EDIT THESE TWO LINES for each language
const TARGET_LANG_NAME = 'Tamil';
const TARGET_LANG_CODE = 'ta';

async function main() {
  const enPath = path.join(__dirname, '..', 'src', 'customer', 'translations', 'en.js');
  const raw = fs.readFileSync(enPath, 'utf-8');
  const objectText = raw.replace('export const en = ', '').replace(/;\s*$/, '');
  const enObject = new Function('return ' + objectText)();

  console.log('Sending to Groq for translation... this may take 30-60 seconds.');

  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_TEXT_MODEL || 'openai/gpt-oss-120b',
      max_tokens: 32000,
      messages: [
        {
          role: 'system',
          content: `You are a professional UI translator. Translate every string VALUE in this JSON object into ${TARGET_LANG_NAME}. Keep every JSON KEY exactly the same. Respond with ONLY the translated JSON object, no markdown code fences, no explanation, nothing before or after the JSON.`,
        },
        { role: 'user', content: JSON.stringify(enObject) },
      ],
    }),
  });

  if (!r.ok) {
    console.error('Groq error:', r.status, await r.text());
    return;
  }

  const data = await r.json();
  let rawOutput = data.choices[0].message.content.trim();

  fs.writeFileSync(path.join(__dirname, `raw-${TARGET_LANG_CODE}-output.txt`), rawOutput, 'utf-8');

  rawOutput = rawOutput.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');

  let translated;
  try {
    translated = JSON.parse(rawOutput);
  } catch (err) {
    console.error(`❌ Could not parse JSON. Check server/raw-${TARGET_LANG_CODE}-output.txt`);
    throw err;
  }

  const outPath = path.join(__dirname, '..', 'src', 'customer', 'translations', `${TARGET_LANG_CODE}.js`);
  fs.writeFileSync(outPath, `export const ${TARGET_LANG_CODE} = ${JSON.stringify(translated, null, 2)};\n`, 'utf-8');

  console.log(`✅ Created ${outPath}`);
}

main().catch(console.error);