'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { emailValidations, passwordValidations } from '../../../utils'
import { registerUser } from '@/database/dbAuth';
import { RegisterUser } from '@/interfaces/register.interface';
import { Title } from '../ui';
import { useUserStore } from '@/store';
import { UserSession } from '@/interfaces/userSession.interface';

export const RegisterForm = () => {

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterUser>()

  const setSession = useUserStore((state) => state.setSession);

  const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
    setErrorMessage("");
    setIsLoading(true);
    const result = await registerUser(data.name, data.email, data.address, data.password)
    if (!result) {
      setErrorMessage("Ha ocurrido un error al intentar crear la cuenta. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
      return;
    }
    const session: UserSession = {
      id: result._id,
      name: result.name,
      email: result.email,
      address: result.address,
      role: result.role,
      image: result.image
    }
    setSession(session)
    setIsLoading(false);
    router.push('/');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Title title="Crear una Cuenta" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-3" style={{ width: '50%' }}>

        <Grid container={true} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              variant="outlined"
              color="info"
              fullWidth
              autoComplete="off"
              {...register("name", {
                required: "Este campo es requerido",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              autoComplete="off"
              color="info"
              {...register("address", {
                required: "Este campo es requerido",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              autoComplete="off"
              color="info"
              {...register("email", {
                required: "Este campo es requerido",
                validate: emailValidations.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              color="info"
              autoComplete="off"
              type="password"
              {...register("password", {
                required: "Este campo es requerido",
                validate: passwordValidations.isPassword,
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

        </Grid>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            color="secondary"
            variant='contained'
            size='large'
            disabled={isLoading}
            type="submit"
            sx={{ width: '100%', fontSize: '20px', mt: 3, mb: 3 }}
          >
            {
              isLoading
                ? (
                  <CircularProgress color='inherit' size={25} />
                )
                : 'Crear cuenta'
            }
          </Button>

          {errorMessage &&
            <Typography variant='body1' color='error' style={{ maxWidth: '450px', marginBottom: '10px' }}>
              {errorMessage}
            </Typography>
          }

          <Link href="/auth/login" style={{ color: 'white' }}>
            Ya tienes una cuenta? Inicia sesión!
          </Link>
        </div>
      </form>
    </Box>
  )
}
