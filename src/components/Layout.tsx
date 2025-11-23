import { Box,Toolbar } from "@mui/material";
import Sidebar from "./SideBar";
import settingsStore from '../stores/settingsStore'
import { observer } from "mobx-react-lite";

interface LayoutProps{
    children:React.ReactNode
}

const Layout =observer(({children}:LayoutProps)=>{
    return (
        <Box sx={{display:'flex'}}>
            <Sidebar systemName={settingsStore.system.name}/>
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
})
export default Layout