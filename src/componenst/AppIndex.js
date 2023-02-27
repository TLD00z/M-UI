import { CssVarsProvider } from "@mui/joy"
import { Box, createTheme, Grid, Pagination, ThemeProvider } from "@mui/material"
import { createContext, useEffect, useState } from "react"
import apiService from "../app/apiService"
import JobCard from "./JobCard"
import LoginDialog from "./loginDialog"
import tjobs from "./jobData.json"
export const LoginContext  = createContext()

function AppIndex() {
 
  const [jobs, setJobs] = useState([])
  const [search] = useState("")
 

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
  const dataLength =jobs.length
  const maxPage =Math.ceil(dataLength /6)
  const [page, setPage] = useState(1)
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
    
        <ThemeProvider theme={theme} >
            <Box>
                <Grid container  spacing={{ xs: 2, md: 3 ,lg :4 }} columns={{ xs: 4, sm : 8,  md: 12 , lg:18 }} >
                {tjobs.slice((page*6)-6,page*6).map(job =>(
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
    
   
    
    </Box>
  );
}

export default AppIndex;
