import {
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Button,
  TextField,
} from "@mui/material";

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Настройки
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Управление настройками приложения
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "3" }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Уведомления
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email уведомления"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Push уведомления"
              />
              <FormControlLabel control={<Switch />} label="SMS уведомления" />
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Внешний вид
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Темная тема"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Профиль системы
            </Typography>
            <Box
              sx={{display:'flex',flexDirection:'column', gap:2,maxWidth:400}}
            >
              <TextField
                label="Название системы"
                defaultValue="Панель администрирования"
                fullWidth
              />
                <TextField
                  label="Описание"
                  multiline
                  rows={3}
                  defaultValue="Дашборд для аналитики с графиками и управлением пользователями"
                  fullWidth
              />
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom color="error">
              Опасная зона
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Эти действия нельзя отменить. Будьте осторожны.
            </Typography>
            <Button variant="outlined" color="error">
              Очистить все данные
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Settings;
