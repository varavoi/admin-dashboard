import { Box,Toolbar } from "@mui/material";
import Sidebar from "./SideBar";

interface LayoutProps{
    children:React.ReactNode
}

const Layout =({children}:LayoutProps)=>{
    return (
        <Box sx={{display:'flex'}}>
            <Sidebar/>
            <Box
                component='main'
                sx={{
                    flexGrow:1,
                    p:3,
                    minHeight:'100vh',
                    backgroundColor:(theme)=>theme.palette.background.default
                }}
            >
                <Toolbar/>
                {children}
            </Box>
        </Box>
    )
}
export default Layout