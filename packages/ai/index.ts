import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

const result = await generateText({
  model: google('gemini-2.5-flash-lite'),
  prompt: 'Analizza questo diario: Oggi mi sento...',
});

console.log(result.text);