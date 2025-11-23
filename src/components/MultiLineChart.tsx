import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MultiLineChartProps {
  data: Array<{ [key: string]: any }> | undefined;
  isLoading?: boolean;
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Загрузка данных...
      </div>
    );
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Нет данных для отображения
      </div>
    );
  }

  // Получаем все ключи кроме 'name' для автоматического создания линий
  const dataKeys = Object.keys(data[0] || {}).filter(key => key !== 'name');

  // Цвета для линий
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Line 
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: colors[index % colors.length] }}
            name={getDisplayName(key)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Функция для преобразования ключей в читаемые названия
const getDisplayName = (key: string): string => {
  const displayNames: { [key: string]: string } = {
    'посещения': 'Посещения',
    'регистрации': 'Новые регистрации',
    'активность': 'Активность',
    'пользователи': 'Пользователи'
  };
  
  return displayNames[key] || key;
};

export default MultiLineChart;