import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  LocalActivity as ActivityIcon,
  VerifiedUserOutlined as UserCheckIcon,
} from '@mui/icons-material';

import userStore from '../stores/userStore';
import StatCard from '../components/ui/StatCard'
import SimpleChart from '../components/charts/SimpleChart';
import CustomPieChart from '../components/charts/PieChart';
import CustomBarChart from '../components/charts/BarChart';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = observer(() => {
  const { isLoading } = userStore;
  
  // Получаем данные для графиков (обычные объекты, не observable)
  const chartData = userStore.getChartData();
  const stats = chartData?.stats || {
    totalUsers: 0,
    activeUsers: 0,
    growth: "0%",
    activity: "0%"
  };

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Дашборд
        </Typography>
        <LoadingSpinner message="Загрузка аналитики..." />
      </Box>
    );
  }

  const statCards = [
    {
      title: "Всего пользователей",
      value: stats.totalUsers,
      icon: <PeopleIcon fontSize="inherit" />,
      color: "#1976d2"
    },
    {
      title: "Активных",
      value: stats.activeUsers,
      icon: <UserCheckIcon fontSize="inherit" />,
      color: "#2e7d32"
    },
    {
      title: "Рост за месяц",
      value: stats.growth,
      icon: <TrendingUpIcon fontSize="inherit" />,
      color: "#ed6c02"
    },
    {
      title: "Активность",
      value: stats.activity,
      icon: <ActivityIcon fontSize="inherit" />,
      color: "#9c27b0"
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Дашборд
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Обзор статистики и аналитики системы
      </Typography>

      {/* Карточки статистики */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid size={{xs:12,sm:6,md:3}} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Графики */}
      <Grid container spacing={3}>
        <Grid size={{xs:12,md:8}}>
          <ChartCard title="Регистрации пользователей по месяцам">
            <SimpleChart data={chartData.registrationData} />
          </ChartCard>
        </Grid>
        <Grid size={{xs:12,md:4}}>
          <ChartCard title="Распределение по ролям">
            <CustomPieChart data={chartData.pieChartData} />
          </ChartCard>
        </Grid>
        <Grid size={{xs:12}} >
          <ChartCard title="Активность по дням недели">
            <CustomBarChart data={chartData.weeklyActivity} />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
});

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

export default Dashboard;