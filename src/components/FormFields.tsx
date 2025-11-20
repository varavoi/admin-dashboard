import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  type SelectChangeEvent,
} from "@mui/material";
import { initialFormData } from "../constants";
interface FormFields{
    formData:typeof initialFormData
    onChange:(field:keyof typeof initialFormData)=>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |SelectChangeEvent)=>void
}
const FormFields:React.FC<FormFields>= ({
    formData,
    onChange
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Имя"
              value={formData.name}
              onChange={onChange("name")}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={onChange("email")}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Роль</InputLabel>
              <Select
                value={formData.role}
                label="Роль"
                onChange={onChange("role")}
              >
                <MenuItem value="Пользователь">Пользователь</MenuItem>
                <MenuItem value="Модератор">Модератор</MenuItem>
                <MenuItem value="Администратор">Администратор</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select
                value={formData.status}
                label="Статус"
                onChange={onChange("status")}
              >
                <MenuItem value="active">Активен</MenuItem>
                <MenuItem value="inactive">Неактивен</MenuItem>
              </Select>
            </FormControl>
          </Box>
    );
};

export default FormFields;