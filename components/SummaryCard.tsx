
import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, icon, color }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between transition-all duration-300 hover:shadow-2xl hover:bg-gray-700">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{formattedAmount}</p>
      </div>
      <div className={`p-3 bg-gray-900 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default SummaryCard;
