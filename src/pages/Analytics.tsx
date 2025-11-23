import { observer } from "mobx-react-lite";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as LineChartIcon,
} from "@mui/icons-material";

import userStore from "../stores/userStore";
import ChartCard from "../components/charts/ChartCard";
import CustomBarChart from "../components/charts/BarChart";
import CustomPieChart from "../components/charts/PieChart";
import SimpleChart from "../components/charts/SimpleChart";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";

const Analytics = observer(() => {
  const { isLoading } = userStore;
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line");

  // Получаем данные для графиков
  const chartData = userStore.getChartData();

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Аналитика
        </Typography>
        <LoadingSpinner message="Загрузка аналитики..." />
      </Box>
    );
  }

  const handleChartTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newChartType: "line" | "bar" | "pie"
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  // Функция для рендеринга графика в зависимости от выбранного типа
  const renderChart = (title: string, data: any, dataKey: string) => {
    switch (chartType) {
      case "line":
        return (
          <ChartCard title={title}>
            <SimpleChart data={data} />
          </ChartCard>
        );
      case "bar":
        return (
          <ChartCard title={title}>
            <CustomBarChart data={data} />
          </ChartCard>
        );
      case "pie":
        return (
          <ChartCard title={title}>
            <CustomPieChart data={data} />
          </ChartCard>
        );
      default:
        return null;
    }
  };
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Детальная аналитика
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Подробные метрики и статистика системы
      </Typography>

      {/* Переключатель типа графиков */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Тип отображения графиков
          </Typography>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="тип графика"
          >
            <ToggleButton value="line" aria-label="линейный график">
              <LineChartIcon sx={{ mr: 1 }} />
              Линейный
            </ToggleButton>
            <ToggleButton value="bar" aria-label="столбчатая диаграмма">
              <BarChartIcon sx={{ mr: 1 }} />
              Столбчатый
            </ToggleButton>
            <ToggleButton value="pie" aria-label="круговая диаграмма">
              <PieChartIcon sx={{ mr: 1 }} />
              Круговой
            </ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
      </Card>

      {/* Основные графики аналитики */}
      <Grid container spacing={3}>
        <Grid size={{xs:12,md:6}}>
          {renderChart(
            "Регистрации пользователей",
            chartData?.registrationData,
            "пользователи"
          )}
        </Grid>

        <Grid size={{xs:12,md:6}}>
          {renderChart(
            "Распределение по ролям",
            chartData?.pieChartData,
            "value"
          )}
        </Grid>

        <Grid size={{xs:12}}>
          {renderChart(
            "Активность по дням недели",
            chartData?.weeklyActivity,
            "посещения"
          )}
        </Grid>

        {/* Дополнительные графики аналитики */}
        <Grid size={{xs:12,md:6}}>
          <ChartCard title="Статусы пользователей">
            <CustomPieChart data={chartData?.statusData} />
          </ChartCard>
        </Grid>

        <Grid size={{xs:12,md:6}}>
          <ChartCard title="Сравнение активности">
            <CustomBarChart
              data={chartData?.weeklyActivity?.map((item) => ({
                name: item.name,
                активность: item.посещения / 10, // Масштабируем для наглядности
                регистрации: item.регистрации * 5,
              }))}
            />
          </ChartCard>
        </Grid>
      </Grid>

      {/* Статистическая информация */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{xs:12}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Статистическая сводка
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{xs:12,md:3}}>
                  <Typography variant="body2" color="textSecondary">
                    Всего пользователей
                  </Typography>
                  <Typography variant="h5">
                    {chartData?.stats.totalUsers || 0}
                  </Typography>
                </Grid>
                <Grid size={{xs:12,md:3}}>
                  <Typography variant="body2" color="textSecondary">
                    Активных пользователей
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {chartData?.stats.activeUsers || 0}
                  </Typography>
                </Grid>
                <Grid size={{xs:12,md:3}}>
                  <Typography variant="body2" color="textSecondary">
                    Рост за месяц
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {chartData?.stats.growth || "0%"}
                  </Typography>
                </Grid>
                <Grid size={{xs:12,md:3}}>
                  <Typography variant="body2" color="textSecondary">
                    Общая активность
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {chartData?.stats.activity || "0%"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
});

export default Analytics;
