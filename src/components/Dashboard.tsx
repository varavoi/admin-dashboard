import { observer } from "mobx-react-lite";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  LocalActivity as ActivityIcon,
  VerifiedUserOutlined as UserCheckIcon,
} from "@mui/icons-material";
import userStore from "../stores/userStore";
import SimpleChart from "./SimpleChart";
import StatCard from "./StatCard";
import CustomPieChart from "./PieChart";
import CustomBarChart from "./BarChart";
import ChartCard from "./ChartCard";

const Dashboard = observer(() => {
  const statCards = [
    {
      title: "Всего пользователей",
      value: userStore.totalUsers,
      icon: <PeopleIcon fontSize="inherit" />,
      color: "#1976d2",
    },
    {
      title: "Активных",
      value: userStore.activeUsersCount,
      icon: <UserCheckIcon fontSize="inherit" />,
      color: "#2e7d32",
    },
    {
      title: "Рост за месяц",
      value: "+12%",
      icon: <TrendingUpIcon fontSize="inherit" />,
      color: "#ed6c02",
    },
    {
      title: "Активность",
      value: "87%",
      icon: <ActivityIcon fontSize="inherit" />,
      color: "#9c27b0",
    },
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
        {statCards.map((cards) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard {...cards} />
          </Grid>
        ))}
      </Grid>

      {/* Графики */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ChartCard title="Активность пользователей">
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
