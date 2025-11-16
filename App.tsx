
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Transaction, TransactionType } from './types';
import SummaryCard from './components/SummaryCard';
import FinanceChart from './components/FinanceChart';
import TransactionList from './components/TransactionList';
import TransactionFormModal from './components/TransactionFormModal';
import { PlusIcon, ArrowUpIcon, ArrowDownIcon, PiggyBankIcon } from './components/Icons';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TransactionType>(TransactionType.INCOME);

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem('finance-tracker-transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('finance-tracker-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const { totalIncome, totalExpenses, savings } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      savings: income - expenses,
    };
  }, [transactions]);

  const handleOpenModal = useCallback((type: TransactionType) => {
    setModalType(type);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleAddTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [...prev, newTransaction]);
  }, []);
  
  const handleDeleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
            Monthly Finance Tracker
          </h1>
          <p className="text-center text-gray-400 mt-2">Your personal dashboard for financial clarity.</p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard title="Total Income" amount={totalIncome} icon={<ArrowUpIcon />} color="text-green-400" />
            <SummaryCard title="Total Expenses" amount={totalExpenses} icon={<ArrowDownIcon />} color="text-red-400" />
            <SummaryCard title="Savings" amount={savings} icon={<PiggyBankIcon />} color={savings >= 0 ? "text-sky-400" : "text-red-400"} />
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => handleOpenModal(TransactionType.INCOME)}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <PlusIcon /> Add Income
            </button>
            <button
              onClick={() => handleOpenModal(TransactionType.EXPENSE)}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <PlusIcon /> Add Expense
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">Financial Breakdown</h2>
              <FinanceChart income={totalIncome} expenses={totalExpenses} />
            </div>
            <div className="lg:col-span-3 bg-gray-800 p-6 rounded-xl shadow-lg">
               <h2 className="text-2xl font-semibold mb-4 text-gray-200">Recent Transactions</h2>
              <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
            </div>
          </div>
        </main>
      </div>
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
        type={modalType}
      />
    </div>
  );
};

export default App;
