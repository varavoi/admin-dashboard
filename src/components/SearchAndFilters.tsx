import { 
    Box,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
 } from "@mui/material";
 import {
    Search as SearchIcon
} from '@mui/icons-material';
interface SearchAndFiltersProps{
    searchTerm:string;
    onSearchChange:(value:string)=>void;
    statusFilter:"all" | "active" | "inactive";
    onStatusFilterChange:(value:"all" | "active" | "inactive")=>void;
    roleFilter:string;
    onRoleFilterChange:(value:string)=>void;
}
const SearchAndFilters:React.FC<SearchAndFiltersProps> = ({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    roleFilter,
    onRoleFilterChange
}) => {
{/* Фильтры и поиск */}
    return ( 
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder="Поиск по имени или email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ minWidth: 300 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={statusFilter}
            label="Статус"
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="active">Активные</MenuItem>
            <MenuItem value="inactive">Неактивные</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Роль</InputLabel>
          <Select
            value={roleFilter}
            label="Роль"
            onChange={(e) => onRoleFilterChange(e.target.value)}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="Администратор">Администратор</MenuItem>
            <MenuItem value="Модератор">Модератор</MenuItem>
            <MenuItem value="Пользователь">Пользователь</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
};

export default SearchAndFilters;