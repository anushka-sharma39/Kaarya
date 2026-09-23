export const LANGUAGES = [
  { code: 'en', label: 'English', speech: 'en-IN' },
  { code: 'hi', label: 'हिंदी', speech: 'hi-IN' },
  { code: 'ta', label: 'தமிழ்', speech: 'ta-IN' },
  { code: 'mr', label: 'मराठी', speech: 'mr-IN' },

];

export const getSpeechLang = (code) =>
  LANGUAGES.find((l) => l.code === code)?.speech || 'en-IN';