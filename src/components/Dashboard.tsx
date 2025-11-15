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

const Dashboard = observer(() => {
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
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Всего пользователей"
            value={userStore.totalUsers}
            icon={<PeopleIcon fontSize="inherit" />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Активных"
            value={userStore.activeUsersCount}
            icon={<UserCheckIcon fontSize="inherit" />}
            color="#2e7d32"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Рост за месяц"
            value="+12%"
            icon={<TrendingUpIcon fontSize="inherit" />}
            color="#ed6c02"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Активность"
            value="87%"
            icon={<ActivityIcon fontSize="inherit" />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Графики */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Активность пользователей
              </Typography>
              <SimpleChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Распределение по ролям
              </Typography>
              {/* Здесь будет круговой график */}
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color="textSecondary">
                  Круговой график появится здесь
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
});

export default Dashboard;
