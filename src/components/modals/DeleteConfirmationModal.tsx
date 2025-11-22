import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  userName,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Подтверждение удаления</DialogTitle>
      <DialogContent>
        <Typography>
          Вы уверены, что хотите удалить пользователя{" "}
          <strong>{userName}</strong>?
        </Typography>
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          Это действие нельзя отменить.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
