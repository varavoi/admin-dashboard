import { Chip} from "@mui/material";
import type { User } from "../types";

interface StatusChipProps {
  status: User['status'];
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => (
  <Chip 
    label={status === 'active' ? 'Активен' : 'Неактивен'} 
    color={status === 'active' ? 'success' : 'default'}
    size="small"
  />
);
export default StatusChip