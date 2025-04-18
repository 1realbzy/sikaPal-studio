'use server';
/**
 * @fileOverview A flow for setting SMART financial goals, considering cultural aspects.
 *
 * - setSmartGoals - A function that handles the process of setting SMART financial goals.
 * - SetSmartGoalsInput - The input type for the setSmartGoals function.
 * - SetSmartGoalsOutput - The return type for the setSmartGoals function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SetSmartGoalsInputSchema = z.object({
  goalDescription: z.string().describe('The user provided description of the financial goal.'),
  currentSavings: z.number().describe('The user current savings.'),
  monthlyIncome: z.number().describe('The user monthly income.'),
  culturalConsiderations: z.string().describe('Any cultural considerations for the financial goal.'),
});
export type SetSmartGoalsInput = z.infer<typeof SetSmartGoalsInputSchema>;

const SetSmartGoalsOutputSchema = z.object({
  smartGoal: z.string().describe('The SMART financial goal.'),
  milestones: z.array(z.string()).describe('The milestones for the financial goal.'),
  feasibilityAssessment: z.string().describe('The feasibility assessment for the financial goal.'),
});
export type SetSmartGoalsOutput = z.infer<typeof SetSmartGoalsOutputSchema>;

export async function setSmartGoals(input: SetSmartGoalsInput): Promise<SetSmartGoalsOutput> {
  return setSmartGoalsFlow(input);
}

const setSmartGoalsPrompt = ai.definePrompt({
  name: 'setSmartGoalsPrompt',
  input: {
    schema: z.object({
      goalDescription: z.string().describe('The user provided description of the financial goal.'),
      currentSavings: z.number().describe('The user current savings.'),
      monthlyIncome: z.number().describe('The user monthly income.'),
      culturalConsiderations: z.string().describe('Any cultural considerations for the financial goal.'),
    }),
  },
  output: {
    schema: z.object({
      smartGoal: z.string().describe('The SMART financial goal.'),
      milestones: z.array(z.string()).describe('The milestones for the financial goal.'),
      feasibilityAssessment: z.string().describe('The feasibility assessment for the financial goal.'),
    }),
  },
  prompt: `You are a financial advisor helping users set SMART financial goals.

  Consider the following information:
  Goal Description: {{{goalDescription}}}
  Current Savings: {{{currentSavings}}}
  Monthly Income: {{{monthlyIncome}}}
  Cultural Considerations: {{{culturalConsiderations}}}

  Create a SMART financial goal, milestones, and a feasibility assessment.
  `,
});

const setSmartGoalsFlow = ai.defineFlow<
  typeof SetSmartGoalsInputSchema,
  typeof SetSmartGoalsOutputSchema
>(
  {
    name: 'setSmartGoalsFlow',
    inputSchema: SetSmartGoalsInputSchema,
    outputSchema: SetSmartGoalsOutputSchema,
  },
  async input => {
    const {output} = await setSmartGoalsPrompt(input);
    return output!;
  }
);
