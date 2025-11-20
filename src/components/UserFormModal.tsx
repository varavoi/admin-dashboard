import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  type SelectChangeEvent,
} from "@mui/material";
import type { UserFormData, UserFormModalProps } from "../types";
import userStore from "../stores/userStore";
import {  useState, useMemo } from "react";
import FormFields from "./FormFields";
import { initialFormData } from "../constants";

const UserFormModal = ({ open, onClose, userId }: UserFormModalProps) => {
  const isEdit = Boolean(userId);
  const user = userId ? userStore.getUserById(userId) : null;
 const initialData = useMemo(():UserFormData => {
    if (user) {
      return {
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      };
    }
    
    return initialFormData;
  }, [user]); 
  const [formData, setFormData] = useState<UserFormData>(initialData);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && user) {
      console.log({...user})
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

  const handleChange = (field: keyof UserFormData) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
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
          <FormFields
            formData={formData}
            onChange={handleChange}
          />
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
