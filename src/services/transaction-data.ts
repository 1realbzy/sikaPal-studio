/**
 * Represents a transaction.
 */
export interface Transaction {
  /**
   * The description of the transaction.
   */
description: string;
  /**
   * The amount of the transaction.
   */
amount: number;
  /**
   * The date of the transaction.
   */
date: string;
}


/**
 * Asynchronously retrieves transaction data.
 *
 * @returns A promise that resolves to an array of Transaction objects.
 */
export async function getTransactions(): Promise<Transaction[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      description: 'Mobile Money Transfer',
      amount: 50,
      date: '2024-01-01',
    },
    {
      description: 'Chop Money',
      amount: 20,
      date: '2024-01-02',
    },
    {
      description: 'Trotro Fare',
      amount: 5,
      date: '2024-01-03',
    },
  ];
}
