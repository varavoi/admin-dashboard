import { 
    Grid,
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";
import CustomBarChart from "../components/BarChart";
import CustomPieChart from "../components/PieChart";
import SimpleChart from "../components/SimpleChart";

const Analytics = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Аналитика
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Детальная аналитика и метрики системы
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{xs:12, md:8}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Статистика посещений
                            </Typography>
                            <CustomBarChart/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs:12, md:4}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Распределение пользователей
              </Typography>
              <CustomPieChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Динамика роста пользователей
              </Typography>
              <SimpleChart />
            </CardContent>
          </Card>
        </Grid>
            </Grid>
        </Box>
    );
};

export default Analytics;