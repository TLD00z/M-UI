import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { createTheme, Divider, ThemeProvider } from '@mui/material';

import Modal from '@mui/material/Modal';
import { LoginContext } from '../App';

const bntTheme = createTheme({
  palette: {
    neutral: {
      main: '#FFA726',
      contrastText: '#fff',
    },
  },
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function JobCard ({ job })   {
  const {isLogin , setOpenLoginDialog} =React.useContext(LoginContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen =  () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <Card sx={{ maxWidth: 400,minHeight:270,background: '#615D5C',display:"flex",flexDirection:"column",justifyContent:"space-around" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18,color:"#fff" }} color="text.secondary" gutterBottom>
          {job.title}
        </Typography>
        <Divider />
        <Box> {job.skills.slice(0, 4).map( (skill,id )=>(
            <Chip label={ skill } color="error" sx={{ ml:0.5,mt:1,fontSize: 12 }} key={id}/>
         ))}
        </Box>
        <Typography variant="body2">
          {job.description.slice(0,200)}...
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:"center"}}>
      <ThemeProvider theme={bntTheme}>
      {isLogin? <Button onClick={handleOpen}>LEARN MORE</Button>:<Button onClick={() => setOpenLoginDialog(true)
}>LEARN MORE</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
      </Modal>
    </ThemeProvider>
      </CardActions>
    </Card>
  );
}
