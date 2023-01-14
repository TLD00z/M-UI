
//import { Link } from 'react-router-dom';
import './App.css';
import {  Box, createTheme, Grid,  Pagination,  ThemeProvider } from "@mui/material"
import SearchAppBar from './componenst/SearchAppBar';
import JobCard from './componenst/JobCard';
import { createContext,  useEffect,  useState } from 'react';
import LoginDialog from './componenst/loginDialog';
import { CssVarsProvider } from '@mui/joy';
//import jobs from "./componenst/testJobsData.json" //json-server lấy không hết
import apiService from './app/apiService';


export const LoginContext  = createContext()

function App() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  useEffect(() => {
    const fetchData = async(search)=>{
      try {
       const res= await apiService.get("/jobs",{
        params:{
          q : search
      }} )
       setJobs(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData(search)
   }, [search])
 
  const [openLoginDialog,setOpenLoginDialog]=useState(false)
  const dataLength =jobs.length
  const maxPage =Math.ceil(dataLength /6)
  const [page, setPage] = useState(1)
  const [isLogin ,setIsLogin] = useState(false) 
  const theme = createTheme({
    palette:{
      mode: "dark",
    }
  })

  const handlePage=(e,page)=>(
    setPage(page)
  )
 


  return (
    <Box >
      <LoginContext.Provider value={{isLogin ,setIsLogin, openLoginDialog,setOpenLoginDialog ,search,setSearch}}>
    <ThemeProvider theme={theme} >
        <Box>
          <SearchAppBar  />
            <Grid container  spacing={{ xs: 2, md: 3 ,lg :4 }} columns={{ xs: 4, sm : 8,  md: 12 , lg:18 }} >
              {jobs.slice((page*6)-6,page*6).map(job =>(
                <Grid item xs={4} sm={4}  md={6} lg={6} key={job.id}  >
                  <JobCard job={job} />
                </Grid> 
                ))}
            </Grid> 
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 minHeight="10vh"
            >
        <CssVarsProvider>
           <LoginDialog  />
        </CssVarsProvider>
              
              <Pagination count={maxPage} color="error" onChange={handlePage} />
            </Box>
        </Box>
      
    </ThemeProvider>
    
    </LoginContext.Provider>
    
    </Box>
  );
}

export default App;
