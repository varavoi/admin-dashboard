import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip, Legend } from "recharts";

const data = [
    { name: 'Администраторы', value: 2 },
  { name: 'Модераторы', value: 5 },
  { name: 'Пользователи', value: 23 },
  { name: 'Гости', value: 12 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const CustomPieChart  = () => {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, percent }) => 
                        `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey='value'
                >
                    {data.map((_,index)=>(
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index%COLORS.length]}
                    />
                    ))}
                    
                </Pie>
                <Tooltip/>
                <Legend/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;