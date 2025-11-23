import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimpleChartProps {
  data: Array<{ name: string; пользователи: number }> | undefined;
  isLoading?: boolean;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Загрузка данных...
      </div>
    );
  }

  // Проверяем, что данные существуют и это массив
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Нет данных для отображения
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`${value} пользователей`, 'Количество']}
          labelFormatter={(label) => `Период: ${label}`}
        />
        <Line 
          type="monotone" 
          dataKey="пользователи" 
          stroke="#1976d2" 
          strokeWidth={2}
          dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#ff5252' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleChart;