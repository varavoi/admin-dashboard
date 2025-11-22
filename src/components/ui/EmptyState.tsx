import {
  Box,
  Typography,
} from "@mui/material";

interface EmptyStateProps {
  searchTerm: string;
}

const EmptyState:React.FC<EmptyStateProps> = ({searchTerm}) => {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography color="textSecondary">
        {searchTerm ? "Пользователи не найдены" : "Нет пользователей"}
      </Typography>
    </Box>
  );
};

export default EmptyState;
