
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from './Icons';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <p className="text-gray-500">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {sortedTransactions.map((transaction) => {
        const isIncome = transaction.type === TransactionType.INCOME;
        return (
          <div key={transaction.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${isIncome ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {isIncome ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
              <div>
                <p className="font-semibold text-gray-100">{transaction.description}</p>
                <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
                <p className={`font-bold ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
                {isIncome ? '+' : '-'}
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                </p>
                <button 
                  onClick={() => onDelete(transaction.id)} 
                  className="text-gray-500 hover:text-red-400 transition-colors"
                  aria-label="Delete transaction"
                >
                    <TrashIcon />
                </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
