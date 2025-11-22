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

const data = [
  { name: "Пн", посещения: 4000, регистрации: 2400 },
  { name: "Вт", посещения: 3000, регистрации: 1398 },
  { name: "Ср", посещения: 2000, регистрации: 9800 },
  { name: "Чт", посещения: 2780, регистрации: 3908 },
  { name: "Пт", посещения: 1890, регистрации: 4800 },
  { name: "Сб", посещения: 2390, регистрации: 3800 },
  { name: "Вс", посещения: 3490, регистрации: 4300 },
];
const CustomBarChart = () => {
  return (
    <ResponsiveContainer width='100%' height={300}>
    <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='name'/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey='посещения' fill="#8884d8"/>
        <Bar dataKey='регистрации' fill="#82ca9d"/>
    </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
