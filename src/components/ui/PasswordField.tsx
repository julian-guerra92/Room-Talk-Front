import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

type PasswordFieldProps = {
  label: string
  register: UseFormRegisterReturn
  errors: FieldError | undefined
  showPassword: boolean
  handleClickShowPassword: () => void
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  register,
  errors,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      type={showPassword ? "text" : "password"}
      {...register}
      error={!!errors}
      helperText={errors?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordField
