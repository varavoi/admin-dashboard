import { observer } from "mobx-react-lite";
import { Grid, Typography, Box,CircularProgress } from "@mui/material";
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  LocalActivity as ActivityIcon,
  VerifiedUserOutlined as UserCheckIcon,
} from "@mui/icons-material";
import userStore from "../stores/userStore";
import SimpleChart from "./charts/SimpleChart";
import StatCard from "./ui/StatCard";
import CustomPieChart from "./charts/PieChart";
import CustomBarChart from "./charts/BarChart";
import ChartCard from "./charts/ChartCard";

const Dashboard = observer(() => {
  const { userStats, isLoading } = userStore;
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Загрузка данных...
        </Typography>
      </Box>
    );
  }
  const statCards = [
    {
      title: "Всего пользователей",
      value: userStats?.totalUsers || 0,
      icon: <PeopleIcon fontSize="inherit" />,
      color: "#1976d2"
    },
    {
      title: "Активных",
      value: userStats?.activeUsers || 0,
      icon: <UserCheckIcon fontSize="inherit" />,
      color: "#2e7d32"
    },
    {
      title: "Рост за месяц",
      value: userStats?.growth || "0%",
      icon: <TrendingUpIcon fontSize="inherit" />,
      color: "#ed6c02"
    },
    {
      title: "Активность",
      value: userStats?.activity || "0%",
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
        {statCards.map((cards,index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard {...cards} />
          </Grid>
        ))}
      </Grid>

      {/* Графики */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ChartCard title="Регистрации пользователей по месяцам">
              <SimpleChart />
          </ChartCard>
          
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <ChartCard title="Распределение по ролям">
              <CustomPieChart />
          </ChartCard>
          <ChartCard title="Активность по дням недели">
              <CustomBarChart />
          </ChartCard>
          
        </Grid>
      </Grid>
    </Box>
  );
});

export default Dashboard;
