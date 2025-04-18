'use server';

/**
 * @fileOverview A transaction categorization AI agent.
 *
 * - categorizeTransaction - A function that categorizes a transaction.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CategorizeTransactionInputSchema = z.object({
  description: z.string().describe('The description of the transaction.'),
  amount: z.number().describe('The amount of the transaction.'),
  date: z.string().describe('The date of the transaction.'),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  category: z.string().describe('The category of the transaction.'),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const transactionCategorizerTool = ai.defineTool({
  name: 'transactionCategorizer',
  description: 'Categorizes a transaction into a relevant category, optimized for the African context.',
  inputSchema: z.object({
    description: z.string().describe('The description of the transaction.'),
    amount: z.number().describe('The amount of the transaction.'),
    date: z.string().describe('The date of the transaction.'),
  }),
  outputSchema: z.string(),
},
async input => {
  // Here, you would implement the logic to categorize the transaction.
  // This could involve calling an external API, using a machine learning model,
  // or simply using a set of rules.
  // For now, we'll just return a placeholder.
  return 'Uncategorized';
});

const prompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {
    schema: z.object({
      description: z.string().describe('The description of the transaction.'),
      amount: z.number().describe('The amount of the transaction.'),
      date: z.string().describe('The date of the transaction.'),
    }),
  },
  output: {
    schema: z.object({
      category: z.string().describe('The category of the transaction.'),
    }),
  },
  prompt: `Categorize the following transaction into one of the following categories:

  Housing (Rent, Mortgage)
  Food (Groceries, Restaurants, Street Food)
  Transportation (Fuel, Trotro, Public Transit)
  Utilities (Electricity, Water, Mobile Data)
  Healthcare
  Education (School Fees)
  Family Support (Remittances)
  Religious/Community
  Business
  Savings & Investments

Transaction Description: {{{description}}}
Transaction Amount: {{{amount}}}
Transaction Date: {{{date}}}

Consider local terms such as Mobile Money, Chop Money, Trotro, Provisions, Susu when categorizing.

Use the transactionCategorizer tool to determine the most relevant category.
`,
  tools: [transactionCategorizerTool],
});

const categorizeTransactionFlow = ai.defineFlow<
  typeof CategorizeTransactionInputSchema,
  typeof CategorizeTransactionOutputSchema
>(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
