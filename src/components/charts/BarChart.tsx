import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/userStore';

const CustomBarChart = observer(() => {
  const { userChartData } = userStore;
  if (!userChartData) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Загрузка данных...
      </div>
    );
  }
  return (
    <ResponsiveContainer width='100%' height={300}>
    <BarChart data={userChartData.weeklyActivity}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='name'/>
        <YAxis/>
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'посещения') return [value, 'Посещения'];
            if (name === 'регистрации') return [value, 'Новые регистрации'];
            return [value, name];
          }}
        />
        <Legend/>
        <Bar dataKey="посещения" fill="#8884d8" name="Посещения" />
        <Bar dataKey="регистрации" fill="#82ca9d" name="Новые регистрации" />
    </BarChart>
    </ResponsiveContainer>
  );
});

export default CustomBarChart;
