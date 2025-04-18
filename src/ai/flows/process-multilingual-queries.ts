// Use server directive for server-side execution
'use server';

/**
 * @fileOverview This file defines a Genkit flow for processing multilingual user queries (English and Twi) related to financial information and advice.
 *
 * - processMultilingualQuery - The main function to process user queries.
 * - ProcessMultilingualQueryInput - The input type for the processMultilingualQuery function.
 * - ProcessMultilingualQueryOutput - The output type for the processMultilingualQuery function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ProcessMultilingualQueryInputSchema = z.object({
  query: z.string().describe('The user query in either English or Twi.'),
});
export type ProcessMultilingualQueryInput = z.infer<typeof ProcessMultilingualQueryInputSchema>;

const ProcessMultilingualQueryOutputSchema = z.object({
  response: z.string().describe('The response to the user query in the same language as the query.'),
});
export type ProcessMultilingualQueryOutput = z.infer<typeof ProcessMultilingualQueryOutputSchema>;

export async function processMultilingualQuery(input: ProcessMultilingualQueryInput): Promise<ProcessMultilingualQueryOutput> {
  return processMultilingualQueryFlow(input);
}

const translateToEnglishTool = ai.defineTool({
  name: 'translateToEnglish',
  description: 'Translates the given text to English.',
  inputSchema: z.object({
    text: z.string().describe('The text to translate.'),
  }),
  outputSchema: z.string().describe('The translated text in English.'),
}, async input => {
  // TODO: Implement the translation logic here.  For now, just return the input.
  return `Translated to English: ${input.text}`;
});

const translateToTargetLanguageTool = ai.defineTool({
  name: 'translateToTargetLanguage',
  description: 'Translates the given text to the target language.',
  inputSchema: z.object({
    text: z.string().describe('The text to translate.'),
    targetLanguage: z.string().describe('The target language for translation.'),
  }),
  outputSchema: z.string().describe('The translated text in the target language.'),
}, async input => {
  // TODO: Implement the translation logic here.  For now, just return the input.
  return `Translated to ${input.targetLanguage}: ${input.text}`;
});

const answerQueryTool = ai.defineTool({
  name: 'answerQuery',
  description: 'Answers the user query about their finances.',
  inputSchema: z.object({
    query: z.string().describe('The user query in English.'),
  }),
  outputSchema: z.string().describe('The answer to the user query.'),
}, async input => {
  // TODO: Implement the logic to answer the user query using available financial data.
  return `Answer to query: ${input.query}`;
});

const prompt = ai.definePrompt({
  name: 'processMultilingualQueryPrompt',
  input: {
    schema: z.object({
      query: z.string().describe('The user query in either English or Twi.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The response to the user query in the same language as the query.'),
    }),
  },
  tools: [translateToEnglishTool, translateToTargetLanguageTool, answerQueryTool],
  prompt: `You are a personal finance assistant that can understand both English and Twi.

  The user will ask a question in either English or Twi.  If the query is in Twi, use the translateToEnglish tool to translate the query to English.
  Then, use the answerQuery tool to answer the query.
  Finally, translate the answer back to the original language using the translateToTargetLanguage tool.

  The user query is: {{{query}}}
  `,
});

const processMultilingualQueryFlow = ai.defineFlow<
  typeof ProcessMultilingualQueryInputSchema,
  typeof ProcessMultilingualQueryOutputSchema
>({
  name: 'processMultilingualQueryFlow',
  inputSchema: ProcessMultilingualQueryInputSchema,
  outputSchema: ProcessMultilingualQueryOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});

