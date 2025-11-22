
import { 
    Box,
    Typography,
    Button,
 } from "@mui/material";
 import {
  Add as AddIcon,
} from "@mui/icons-material";
interface TableActionsProps {
    title:string;
    count:number;
    onAddClick:()=>void;
    addButtonText:string;
}
const TableActions:React.FC<TableActionsProps> = ({
    title,
    count,
    onAddClick,
    addButtonText
}) => {
    return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title} ({count})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
        >
          {addButtonText}
        </Button>
      </Box>
    );
};

export default TableActions;