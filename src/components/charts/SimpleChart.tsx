import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const data = [
  { name: "Янв", users: 400 },
  { name: "Фев", users: 600 },
  { name: "Мар", users: 800 },
  { name: "Апр", users: 1200 },
  { name: "Май", users: 900 },
  { name: "Июн", users: 1500 },
];

const SimpleChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#1976d2"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleChart;
