import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/joy";

function FTextField({name ,...other}) {
    const {control} = useFormContext()
    return(
        <Controller
               name={name}
               control={control}
               render= {({field ,fieldState:{error}})=>(
                <TextField
                 {...field}
                 required
                 error = {!!error}
                 helperText={error?.message}
                 {...other}
                 />
              )}
        />
    )
}

export default FTextField