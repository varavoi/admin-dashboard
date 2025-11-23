import {
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Grid,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import settingsStore from "../stores/settingsStore";
import { useTheme } from "../hooks/useTheme";
import { useToast } from "../contexts/ToastContext";
import { useState } from "react";

const Settings = observer(() => {
  const { themeMode, setThemeMode } = useTheme();
  const { showToast } = useToast();
  const [systemName, setSystemName] = useState(settingsStore.system.name);
  const [systemDescription, setSystemDescription] = useState(
    settingsStore.system.description
  );

  const handleSaveSystemSettings = () => {
    settingsStore.setSystemName(systemName);
    settingsStore.setSystemDescription(systemDescription);
    showToast("Системные настройки сохранены", "success");
  };
  const handleResetSettings = () => {
    settingsStore.resetSettings();
    setSystemName(settingsStore.system.name);
    setSystemDescription(settingsStore.system.description);
    showToast("Настройки сброшены до значений по умолчанию", "info");
  };
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.value as "light" | "dark";
    setThemeMode(newTheme);
    showToast(
      `Тема изменена на ${newTheme === "light" ? "светлую" : "темную"}`,
      "success"
    );
  };
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <SettingsIcon />
        Настройки
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Управление настройками приложения
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Настройки внешнего вида */}
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PaletteIcon />
                Внешний вид
              </Typography>

              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Тема оформления</FormLabel>
                <RadioGroup value={themeMode} onChange={handleThemeChange}>
                  <FormControlLabel
                    value="light"
                    control={<Radio />}
                    label="Светлая тема"
                  />
                  <FormControlLabel
                    value="dark"
                    control={<Radio />}
                    label="Темная тема"
                  />
                </RadioGroup>
              </FormControl>

              <Alert severity="info" sx={{ mt: 2 }}>
                Тема применяется ко всему приложению мгновенно
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        {/* Настройки уведомлений */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Уведомления
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsStore.notifications.email}
                      onChange={(e) =>
                        settingsStore.setEmailNotifications(e.target.checked)
                      }
                    />
                  }
                  label="Email уведомления"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsStore.notifications.push}
                      onChange={(e) =>
                        settingsStore.setPushNotifications(e.target.checked)
                      }
                    />
                  }
                  label="Push уведомления"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsStore.notifications.sms}
                      onChange={(e) =>
                        settingsStore.setSmsNotifications(e.target.checked)
                      }
                    />
                  }
                  label="SMS уведомления"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Системные настройки */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Внешний вид
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Название системы"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    fullWidth
                    margin="normal"
                    helperText="Отображается в боковой панели"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Описание системы"
                    value={systemDescription}
                    onChange={(e) => setSystemDescription(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    margin="normal"
                    helperText="Описание вашей системы или проекта"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={handleSaveSystemSettings}
                sx={{ mt: 2 }}
              >
                Сохранить системные настройки
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Опасная зона */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error">
                Опасная зона
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Эти действия нельзя отменить. Будьте осторожны.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleResetSettings}
                >
                  Сбросить все настройки
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => showToast("Функция в разработке", "warning")}
                >
                  Очистить все данные
                </Button>
              </Box>
              <Alert severity="warning" sx={{ mt: 2 }}>
                Сброс настроек вернет все параметры к значениям по умолчанию
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
});

export default Settings;
