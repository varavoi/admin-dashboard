import { Typography, Box } from "@mui/material";
import UserList from "../components/UserList";

const Users = () => {
    return (
        <Box>
           <Typography variant="h4" gutterBottom>
                Управление пользователями
            </Typography> 
            <Typography variant="body1" color="textSecondary" sx={{mb:3}}>
                Просмотр и управление учетными записями пользователей
            </Typography>
            <UserList/>
        </Box>
    );
};

export default Users;