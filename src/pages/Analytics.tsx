import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon,
  ShowChart as LineChartIcon 
} from '@mui/icons-material';

import userStore from '../stores/userStore';
import SimpleChart from '../components/charts/SimpleChart';
import MultiLineChart from '../components/MultiLineChart';
import CustomPieChart from '../components/charts/PieChart';
import CustomBarChart from '../components/charts/BarChart';
import LoadingSpinner from '../components/LoadingSpinner';
import ChartCard from '../components/charts/ChartCard';
type ChartType = 'line' | 'bar' | 'pie';

const Analytics = observer(() => {
  const { isLoading } = userStore;
  const [chartType, setChartType] = useState<ChartType>('line');
  
  // Получаем данные для графиков
  const chartData = userStore.getChartData();

  const handleChartTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newChartType: ChartType,
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

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
        {/* Регистрации пользователей - линейный и столбчатый */}
        <Grid size={{xs:12, md:6}}>
          <ChartCard title="Регистрации пользователей по месяцам">
            {chartType === 'pie' ? (
              <CustomPieChart 
                data={chartData?.registrationData?.map(item => ({
                  name: item.name,
                  value: item.пользователи
                }))} 
              />
            ) : chartType === 'bar' ? (
              <CustomBarChart data={chartData?.registrationData} />
            ) : (
              <SimpleChart data={chartData?.registrationData} />
            )}
          </ChartCard>
        </Grid>
        
        {/* Распределение по ролям - столбчатый и круговой */}
        <Grid size={{xs:12, md:6}}>
          <ChartCard title="Распределение по ролям">
            {chartType === 'line' ? (
              <SimpleChart 
                data={chartData?.pieChartData?.map(item => ({
                  name: item.name,
                  пользователи: item.value
                }))} 
              />
            ) : chartType === 'bar' ? (
              <CustomBarChart 
                data={chartData?.pieChartData?.map(item => ({
                  name: item.name,
                  пользователи: item.value
                }))} 
              />
            ) : (
              <CustomPieChart data={chartData?.pieChartData} />
            )}
          </ChartCard>
        </Grid>

        {/* Активность по дням недели - только столбчатый */}
        <Grid size={{xs:12}}>
          <ChartCard title="Активность по дням недели">
            {chartType === 'line' ? (
              <MultiLineChart data={chartData?.weeklyActivity} />
            ) : chartType === 'pie' ? (
              <CustomPieChart 
                data={chartData?.weeklyActivity?.map(item => ({
                  name: item.name,
                  value: item.посещения
                }))} 
              />
            ) : (
              <CustomBarChart data={chartData?.weeklyActivity} />
            )}
          </ChartCard>
        </Grid>

        {/* Дополнительные графики */}
        <Grid size={{xs:12, md:6}}>
          <ChartCard title="Статусы пользователей">
            <CustomPieChart data={chartData?.statusData} />
          </ChartCard>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <ChartCard title="Сравнение активности">
            {chartType === 'line' ? (
              <MultiLineChart 
                data={chartData?.weeklyActivity?.map(item => ({
                  name: item.name,
                  активность: item.посещения / 10,
                  регистрации: item.регистрации * 5
                }))} 
              />
            ) : chartType === 'pie' ? (
              <CustomPieChart 
                data={chartData?.weeklyActivity?.map(item => ({
                  name: item.name,
                  value: item.посещения
                }))} 
              />
            ) : (
              <CustomBarChart 
                data={chartData?.weeklyActivity?.map(item => ({
                  name: item.name,
                  активность: item.посещения / 10,
                  регистрации: item.регистрации * 5
                }))} 
              />
            )}
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
                <Grid size={{xs:12, md:3}}>
                  <Typography variant="body2" color="textSecondary">
                    Всего пользователей
                  </Typography>
                  <Typography variant="h5">
                    {chartData?.stats.totalUsers || 0}
                  </Typography>
                </Grid>
                <Grid size={{xs:12, md:3}}>
                  <Typography variant="body2" color="textSecondary">
                    Активных пользователей
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {chartData?.stats.activeUsers || 0}
                  </Typography>
                </Grid>
                <Grid size={{xs:12, md:3}}>
                  <Typography variant="body2" color="textSecondary">
                    Рост за месяц
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {chartData?.stats.growth || "0%"}
                  </Typography>
                </Grid>
                <Grid size={{xs:12, md:3}}>
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