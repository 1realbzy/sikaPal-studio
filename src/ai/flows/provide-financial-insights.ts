// Implemented Genkit flow to provide personalized financial insights based on spending patterns.

'use server';

/**
 * @fileOverview A financial insights AI agent.
 *
 * - provideFinancialInsights - A function that provides financial insights.
 * - ProvideFinancialInsightsInput - The input type for the provideFinancialInsights function.
 * - ProvideFinancialInsightsOutput - The return type for the provideFinancialInsights function.
 */

import {ai} from '@/ai/ai-instance';
import {getTransactions, Transaction} from '@/services/transaction-data';
import {z} from 'zod';

const ProvideFinancialInsightsInputSchema = z.object({
  transactions: z.array(
    z.object({
      description: z.string().describe('The description of the transaction.'),
      amount: z.number().describe('The amount of the transaction.'),
      date: z.string().describe('The date of the transaction.'),
    })
  ).optional().describe('A list of transactions to analyze.'),
});
export type ProvideFinancialInsightsInput = z.infer<typeof ProvideFinancialInsightsInputSchema>;

const ProvideFinancialInsightsOutputSchema = z.object({
  incomeVsExpenseTrend: z.string().describe('The trend of income vs expenses.'),
  savingsRate: z.string().describe('The savings rate.'),
  insights: z.array(z.string()).describe('A list of financial insights.'),
});
export type ProvideFinancialInsightsOutput = z.infer<typeof ProvideFinancialInsightsOutputSchema>;

export async function provideFinancialInsights(input: ProvideFinancialInsightsInput): Promise<ProvideFinancialInsightsOutput> {
  return provideFinancialInsightsFlow(input);
}

const analyzeTransactionsTool = ai.defineTool({
  name: 'analyzeTransactions',
  description: 'Analyzes spending patterns to provide financial insights and identify trends.',
  inputSchema: z.array(
    z.object({
      description: z.string().describe('The description of the transaction.'),
      amount: z.number().describe('The amount of the transaction.'),
      date: z.string().describe('The date of the transaction.'),
    })
  ),
  outputSchema: z.object({
    incomeVsExpenseTrend: z.string().describe('The trend of income vs expenses.'),
    savingsRate: z.string().describe('The savings rate.'),
    insights: z.array(z.string()).describe('A list of financial insights.'),
  }),
  async handler(transactions) {
    // TODO: Implement the transaction analysis logic here.
    // For now, return some dummy data.
    return {
      incomeVsExpenseTrend: 'Income is slightly higher than expenses.',
      savingsRate: 'Savings rate is 10%',
      insights: [
        'Consider reducing spending on non-essential items.',
        'Explore investment opportunities to grow your savings.',
      ],
    };
  },
});

const prompt = ai.definePrompt({
  name: 'provideFinancialInsightsPrompt',
  tools: [analyzeTransactionsTool],
  prompt: `Based on the user's transaction history, analyze their spending patterns and provide personalized financial insights.

  Use the analyzeTransactions tool to analyze the transactions and provide insights.  If no transactions are passed in, use the analyzeTransactions tool with an empty array.
  `,
});

const provideFinancialInsightsFlow = ai.defineFlow<
  typeof ProvideFinancialInsightsInputSchema,
  typeof ProvideFinancialInsightsOutputSchema
>(
  {
    name: 'provideFinancialInsightsFlow',
    inputSchema: ProvideFinancialInsightsInputSchema,
    outputSchema: ProvideFinancialInsightsOutputSchema,
  },
  async input => {
    // If transactions are not provided, fetch them.
    const transactions = input.transactions ?? await getTransactions();

    const {output} = await prompt({
transactions
    });
    return output!;
  }
);
