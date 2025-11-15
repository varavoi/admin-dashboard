import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import  CssBaseline from "@mui/material/CssBaseline"
import {Box, Typography} from '@mui/material'
import UserList from "./components/UserList"

const darkTheme = createTheme({
  palette:{
    mode:'dark'
  }
})
function App() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box sx={{padding:3}}>
          <Typography variant="h4" component='h1' gutterBottom>
              Панель администрирования
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{mb:3}}>
            Обзор системы и управление пользователями
          </Typography>
          <UserList/>
        </Box>
      </ThemeProvider>
  )
}

export default App
