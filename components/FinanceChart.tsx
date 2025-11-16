
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinanceChartProps {
  income: number;
  expenses: number;
}

const FinanceChart: React.FC<FinanceChartProps> = ({ income, expenses }) => {
  const savings = Math.max(0, income - expenses);
  
  const data = [
    { name: 'Expenses', value: expenses },
    { name: 'Savings', value: savings },
  ];

  const COLORS = ['#F87171' /* red-400 */, '#38BDF8' /* sky-400 */];

  if (income === 0) {
    return (
        <div className="flex items-center justify-center h-full min-h-[300px]">
            <p className="text-gray-500">No financial data to display. Add some income to get started.</p>
        </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                
                return (
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                );
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
                backgroundColor: '#1F2937' /* gray-800 */, 
                border: '1px solid #374151' /* gray-700 */,
                borderRadius: '0.5rem'
            }} 
            itemStyle={{ color: '#F9FAFB' /* gray-50 */ }}
           />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
