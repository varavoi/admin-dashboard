import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps{
  systemName:string
}
const drawerWidth = 240;

const Sidebar:React.FC<SidebarProps> = ({systemName}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { text: "Дашборд", icon: <DashboardIcon />, path: "/" },
    { text: "Пользователи", icon: <PeopleIcon />, path: "/users" },
    { text: "Аналитика", icon: <ChartIcon />, path: "/analytics" },
    { text: "Настройки", icon: <SettingsIcon />, path: "/settings" },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {systemName}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default Sidebar;
