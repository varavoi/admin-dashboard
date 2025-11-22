import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  type SelectChangeEvent,
} from "@mui/material";
import type { UserFormData, UserFormModalProps } from "../../types";
import userStore from "../../stores/userStore";
import {  useState, useEffect } from "react";
import FormFields from "../ui/FormFields";
import { initialFormData } from "../../constants";
import {useToast} from '../../contexts/ToastContext'
export type UserFormErrors = {
  name?: string;
  email?: string;
  role?: string;
  status?: "active" | "inactive"|undefined;
}
const validateForm =(formData:typeof initialFormData)=>{
   const errors: UserFormErrors = {}
  if(!formData.name.trim()){
    errors.name ='Имя обязательно';
  }
  if (!formData.email.trim()) {
    errors.email = 'Email обязателен';
  }
  else if(!/\S+@\S+\.\S+/.test(formData.email)){
    errors.email = 'Некорректный формат email';
  }
  return {
    isValid:Object.keys(errors).length===0,
    errors
  }
}

const UserFormModal = ({ open, onClose, user }: UserFormModalProps) => {
  const isEdit = Boolean(user);
  const { showToast } = useToast();
  const [errors, setErrors]=useState<UserFormErrors>({})

  const [formData, setFormData] = useState<UserFormData>(initialFormData);
useEffect(() => {
    if (open) {
      if (user) {
        // Редактирование существующего пользователя
        setFormData({
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        });
      } else {
        // Создание нового пользователя
        setFormData(initialFormData);
      }
      setErrors({});
    }
  }, [open, user]); 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(formData)
    if(!validation.isValid){
      setErrors(validation.errors)
    }
    try {
      if (isEdit && user) {
      console.log({...user})
      userStore.editUser(user.id,formData)
      showToast('Пользователь успешно обновлен', 'success')
    } else {
      userStore.createUser({
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      });
      showToast('Пользователь успешно создан', 'success')
    }
    onClose();
    } catch {
      showToast(`Произошла ошибка при сохранении`, 'error');
    }
    
  };

  const handleChange = (field: keyof UserFormData) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
            errors={errors}
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
