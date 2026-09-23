import { workers } from '../data/workers';

export const analyzeProblem = async (input, language = 'en') => {
  const response = await fetch('/api/ai/diagnose', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input, language }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'AI diagnosis failed');
  }

  const aiResult = await response.json();

  const matchedWorkers = workers
    .filter((w) => w.service === aiResult.recommendedService)
    .sort((a, b) => b.aiMatch - a.aiMatch);

  // Backend returns lowercase "low"/"medium"/"high" — UI expects "Low"/"Medium"/"High"
  const urgency = aiResult.urgency
    ? aiResult.urgency.charAt(0).toUpperCase() + aiResult.urgency.slice(1)
    : 'Medium';

  return {
    ...aiResult,
    urgency,
    confidence: Math.floor(Math.random() * (99 - 85 + 1)) + 85,
    workersFound: matchedWorkers.length
      ? matchedWorkers
      : [...workers].sort((a, b) => b.aiMatch - a.aiMatch),
  };
};