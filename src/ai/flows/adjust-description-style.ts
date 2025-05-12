// AdjustDescriptionStyle.ts
'use server';

/**
 * @fileOverview Adjusts the style and length of text descriptions using AI.
 *
 * Exports:
 * - `adjustDescriptionStyle`: Function to adjust the style and length of a given text description.
 * - `AdjustDescriptionStyleInput`: Input type for the `adjustDescriptionStyle` function.
 * - `AdjustDescriptionStyleOutput`: Output type for the `adjustDescriptionStyle` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustDescriptionStyleInputSchema = z.object({
  text: z.string().describe('The text description to adjust.'),
  style: z
    .string()
    .describe(
      'The desired style for the description (e.g., formal, concise, creative).' 
    ),
  maxLength: z
    .number()
    .optional()
    .describe(
      'The maximum length of the adjusted description. If not provided, no length constraint is applied.'
    ),
});

export type AdjustDescriptionStyleInput = z.infer<typeof AdjustDescriptionStyleInputSchema>;

const AdjustDescriptionStyleOutputSchema = z.object({
  adjustedText: z.string().describe('The adjusted text description.'),
});

export type AdjustDescriptionStyleOutput = z.infer<typeof AdjustDescriptionStyleOutputSchema>;

export async function adjustDescriptionStyle(
  input: AdjustDescriptionStyleInput
): Promise<AdjustDescriptionStyleOutput> {
  return adjustDescriptionStyleFlow(input);
}

const adjustDescriptionStylePrompt = ai.definePrompt({
  name: 'adjustDescriptionStylePrompt',
  input: {schema: AdjustDescriptionStyleInputSchema},
  output: {schema: AdjustDescriptionStyleOutputSchema},
  prompt: `You are an AI assistant that adjusts the style and length of text descriptions based on user preferences.

  Original Text: {{{text}}}
  Desired Style: {{{style}}}
  Maximum Length: {{#if maxLength}}{{{maxLength}}} characters{{else}}No limit{{/if}}

  Adjust the text to match the desired style and length. Return only the adjusted text.
  `, // Updated prompt
});

const adjustDescriptionStyleFlow = ai.defineFlow(
  {name: 'adjustDescriptionStyleFlow', inputSchema: AdjustDescriptionStyleInputSchema, outputSchema: AdjustDescriptionStyleOutputSchema},
  async input => {
    const {output} = await adjustDescriptionStylePrompt(input);
    return output!;
  }
);
