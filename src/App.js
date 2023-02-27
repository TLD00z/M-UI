
//import JobCard from './componenst/JobCard';
//import { Link } from 'react-router-dom';
//import LoginDialog from './componenst/loginDialog';
import './App.css';
import {  Box, Container, createTheme,  ThemeProvider } from "@mui/material"
import SearchAppBar from './componenst/SearchAppBar';
import { createContext,   useState } from 'react';

import AppIndex from './componenst/AppIndex'
//import apiService from './app/apiService';//json-server lấy không hết
import { Route, Routes } from 'react-router-dom';
import Detail from './componenst/Detail';


export const LoginContext  = createContext()

function App() {
  
  const theme = createTheme({
    palette:{
      mode: "dark",
    }
  })

  const [search, setSearch] = useState("")
 
  const [openLoginDialog,setOpenLoginDialog]=useState(false)
  

  const [isLogin ,setIsLogin] = useState(false) 
  

 


  return (
    <Box >
      <ThemeProvider theme={theme} >
      <LoginContext.Provider value={{isLogin ,setIsLogin, openLoginDialog,setOpenLoginDialog ,search,setSearch}}>
      <SearchAppBar theme={theme}/>
      <Container>
    <Routes>
      <Route path='/' element={<AppIndex/>}/>
      <Route path='/detail/:id' element={<Detail/>} />
    </Routes>
      </Container>

      </LoginContext.Provider>
    </ThemeProvider>
    </Box>
  );
}

export default App;
