
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';
import { XIcon } from './Icons';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  type: TransactionType;
}

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ isOpen, onClose, onSubmit, type }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setDescription('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0 || !description.trim()) {
      // Basic validation
      return;
    }
    onSubmit({
      type,
      amount: numericAmount,
      description,
    });
    onClose();
  };
  
  if (!isOpen) {
    return null;
  }

  const isIncome = type === TransactionType.INCOME;
  const title = isIncome ? 'Add Income' : 'Add Expense';
  const accentColor = isIncome ? 'green' : 'red';

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity"
        onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md m-4 relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-200"
            aria-label="Close modal"
        >
          <XIcon />
        </button>

        <h2 className={`text-2xl font-bold mb-6 text-center text-${accentColor}-400`}>{title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isIncome ? 'e.g., Monthly Salary' : 'e.g., Groceries'}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-${accentColor}-500"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-7 text-white focus:outline-none focus:ring-2 focus:ring-${accentColor}-500"
                required
                min="0.01"
                step="0.01"
                />
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-${accentColor}-600 hover:bg-${accentColor}-700 font-semibold transition-colors`}
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormModal;
