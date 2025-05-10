// This file contains the Genkit flow for answering user questions based on the Quran and the teachings of Prophet Muhammad.

'use server';

/**
 * @fileOverview An AI agent that answers questions about Islam based on the Quran and the teachings of Prophet Muhammad.
 *
 * - answerQuestion - A function that handles the question answering process.
 * - AnswerQuestionInput - The input type for the answerQuestion function.
 * - AnswerQuestionOutput - The return type for the answerQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionInputSchema = z.object({
  question: z.string().describe('The question to be answered about Islam.'),
  language: z.string().optional().describe('The language of the question and desired answer (e.g., "en", "ar"). Defaults to English if not provided.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the Quran and the teachings of Prophet Muhammad, in the specified language.'),
  disclaimer: z.string().describe('A disclaimer emphasizing that the answer is an interpretation and should not be taken as a definitive religious ruling, in the specified language.'),
});
export type AnswerQuestionOutput = z.infer<typeof AnswerQuestionOutputSchema>;

export async function answerQuestion(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
  return answerQuestionFlow(input);
}

const answerQuestionPrompt = ai.definePrompt({
  name: 'answerQuestionPrompt',
  input: {schema: AnswerQuestionInputSchema},
  output: {schema: AnswerQuestionOutputSchema},
  prompt: `You are an AI assistant providing answers based on the Quran and the teachings of Prophet Muhammad.
You can understand and respond in English and Arabic.

Question: {{{question}}}
{{#if language}}Language of question: {{{language}}}{{else}}Language of question: English (default){{/if}}

Provide a comprehensive answer in the language of the question (English or Arabic) based on the Quran and the teachings of Prophet Muhammad. Include a disclaimer in the same language, emphasizing that the answer is an interpretation and should not be taken as a definitive religious ruling.`,
});

const answerQuestionFlow = ai.defineFlow(
  {
    name: 'answerQuestionFlow',
    inputSchema: AnswerQuestionInputSchema,
    outputSchema: AnswerQuestionOutputSchema,
  },
  async input => {
    const {output} = await answerQuestionPrompt(input);
    return output!;
  }
);

