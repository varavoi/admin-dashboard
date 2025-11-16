import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  type SelectChangeEvent,
} from "@mui/material";
import type { User } from "../types";
import userStore from "../stores/userStore";
import {  useState,useMemo } from "react";


interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  userId?: number;
}
type UserFormData = Omit<User, "id" | "joinDate"> & {
  status: "active" | "inactive";
};
const UserFormModal = ({ open, onClose, userId }: UserFormModalProps) => {
  const isEdit = Boolean(userId);
  const user = userId ? userStore.getUserById(userId) : null;
  const initialFormData = useMemo(() => {
  if (user) {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };
  } else {
    return {
      name: "",
      email: "",
      role: "Пользователь",
      status: "active" as "active" | "inactive",
    };
  }
}, [user]);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && user) {
      userStore.updateUser({
        ...user,
        ...formData,
      });
    } else {
      userStore.addUser({
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      });
    }
    onClose();
  };

  const handleChange = (field: keyof UserFormData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? "Редактировать пользователя" : "Добавить пользователя"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Имя"
              value={formData.name}
              onChange={handleChange("name")}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Роль</InputLabel>
              <Select
                value={formData.role}
                label="Роль"
                onChange={handleChange("role")}
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
                onChange={handleChange("status")}
              >
                <MenuItem value="active">Активен</MenuItem>
                <MenuItem value="inactive">Неактивен</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">
            {isEdit ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserFormModal;
