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
  language: z.string().optional().describe('The preferred language for the answer (e.g., "en", "ar", "ur", "fa"). If not provided, the AI will attempt to detect the language of the question and respond in that language. Supported languages: English, Arabic, Urdu, Persian (Farsi). Defaults to English if detection is unclear or the language is unsupported.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question based on the Quran and the teachings of Prophet Muhammad, in the determined language (user-specified or auto-detected).'),
  disclaimer: z.string().describe('A disclaimer emphasizing that the answer is an interpretation and should not be taken as a definitive religious ruling, in the determined language (user-specified or auto-detected).'),
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
You are proficient in English, Arabic, Urdu, and Persian (Farsi).

Question: {{{question}}}

{{#if language}}
The user has specified the language for the answer as: {{{language}}}. Please use this language for your response.
Ensure your entire response, including the answer and disclaimer, is in {{{language}}}.
{{else}}
Please automatically detect the language of the user's question.
The supported languages for response are English, Arabic, Urdu, and Persian (Farsi).
If the question's language is one of these, please respond in that language.
If the question's language is not one of these supported languages, or if detection is unclear, please respond in English.
Ensure your entire response, including the answer and disclaimer, is in the determined language.
{{/if}}

Provide a comprehensive answer based on the Quran and the teachings of Prophet Muhammad.
The answer and the disclaimer must be in the determined language (either the language specified by the user, or the language detected from the question as per the rules above).
Include a disclaimer, in the same language as the answer, emphasizing that the answer is an interpretation and should not be taken as a definitive religious ruling.`,
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
