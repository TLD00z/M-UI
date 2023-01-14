import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';

import Typography from '@mui/joy/Typography';
import { useForm } from 'react-hook-form'
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormProvider,FTextField } from "./form"
import { LoginContext, } from "../App"
import { loginApi } from './loginFakeApi';




export default function LoginDialog() {
  const defaultValues ={
    username:"abc",
    password:"123"

  }
  const {setIsLogin , openLoginDialog, setOpenLoginDialog} =React.useContext(LoginContext)
  const methods = useForm({defaultValues})//{resolver:yupResolver(schema)}
  const { 
    handleSubmit,
    formState:{errors},
  }= methods
  
  const onSubmit = async (data)=>{
    console.log(data);
    try {
      await loginApi(data.username ,data.password)
      setIsLogin(true) 
      setOpenLoginDialog(false) 
    } catch (error) {
      setIsLogin(false)
    }
  
  } 
  const [showPassword, setShowPassword] = React.useState(false)


  return (
    <React.Fragment>
      <Modal open={openLoginDialog} onClose={() => setOpenLoginDialog(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Login
          </Typography>
            <FormProvider methods={methods}  onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {!!errors.afterSubmit &&(
                <h1>{errors.afterSubmit.message}</h1>
              )}
              <FTextField name="username" label="Username (abc)"/>
              <FTextField 
                name="password"
                label="Password (123)"
                type={showPassword ?"text" :"password"}
                inputprops={{
                  endAdornment:(
                    <InputAdornment position='end'>
                      <IconButton
                      aria-label = "toggel password visbility"
                      onClick={()=> setShowPassword(!showPassword)}
                      onMouseDown={(e)=>e.preventDefault()}
                      edge="end" 
                      >
                        {showPassword ?<VisibilityOff/>:<Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                 }}
                 />
              <Button type="submit" onSubmit={onSubmit}>Submit</Button>
            </Stack>
          </FormProvider>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}