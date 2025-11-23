import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/userStore';


const SimpleChart = observer(() => {
  const { userChartData } = userStore;
  if (!userChartData) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Загрузка данных...
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={userChartData.registrationData}>
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
})

export default SimpleChart;
