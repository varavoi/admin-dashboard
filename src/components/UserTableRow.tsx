import { TableRow, TableCell, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { User } from "../types";
import StatusChip from "./StatusChip";

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow hover>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <StatusChip status={user.status}/>
      </TableCell>
      <TableCell>{user.joinDate}</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={() => onEdit(user)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(user)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
