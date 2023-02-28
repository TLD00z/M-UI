import { Box,  Chip, Typography } from '@mui/material'
//import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import tjobs from "./jobData.json" 



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    bgcolor: 'text.primary',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

  };



function Detail() {
    
    const jid = useParams()
    const [job, setJob] = useState(undefined) //[]
   


    // useEffect(() => {
    //     function getBaseUrl() {
    //         return `/jobs`
    //       }
    //     async function jobData(){
    //         try {
    //             const { data } = await axios.get(getBaseUrl())
    //             setJob(data)
    //     } catch (error) {
    //         console.log(error)
    //         //setError(true)
    
    //       }}
    // }, [])
    useEffect(()=>{
      setJob(tjobs.find(obj => obj.id === jid.id))
    }, [jid.id])
   
  
  return (
    <>
    
      {job &&<Box>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ ml: 1 }}>
           {job.title}
          </Typography>
          <Box sx={{ mt: 2 }}> {job.skills.map( (skill,id )=>(
            <Chip label={ skill } color="error" sx={{ ml:0.5,mt:1,fontSize: 12 }} key={id}/>
         ))}
        </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {job.description}
          </Typography>
          <Typography id="modal-modal-salary" sx={{ mt: 2 }}>
           Salary: {job.salaryLow} - {job.salaryHigh}
          </Typography>
        </Box> 
    </Box> }
    </>
    
  )
}

export default Detail
