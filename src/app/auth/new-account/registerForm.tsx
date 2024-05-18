'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Checkbox, CircularProgress, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { emailValidations, passwordValidations } from '../../../../utils'
import { /*CreateNewUserInterface*/ User, /*UserRoles, identificationTypes*/ } from '../../../interfaces';
//import { createNewUser } from 'database/dbAuth';

export const RegisterForm = () => {

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<User>()

  const onSubmit: SubmitHandler<User> = async (data) => {

    setErrorMessage("");
    setIsLoading(true);

   /* const newUser: CreateNewUserInterface = {
      userId: data.identificationNumber,
      userIdTipe: data.identificationType,
      userName: data.name,
      userLastname: data.lastName,
      userPhoneNumber: `${data.telephonePrefix} ${data.telephoneNumber}`,
      userEmail: data.email,
      userPassword: data.password,
      roleId: UserRoles.USUARIO_REGISTRADO
    }*/

    try {
      const result = await createNewUser(newUser);
      if (!result) {
        setErrorMessage("Ha ocurrido un error al intentar crear la cuenta. Por favor, inténtalo de nuevo.");
        setIsLoading(false);
      }
      if (result) {
        await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password
        });
        router.push('/');
      }
    } catch (error) {
      setErrorMessage("Ha ocurrido un error al intentar crear la cuenta. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex flex-col">

      <Grid container={true} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre completo"
            variant="outlined"
            fullWidth
            {...register("name", {
              required: "Este campo es requerido",
              pattern: { value: /^[a-zA-Z\s]*$/, message: "El nombre proporcionado no es válido" },
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
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
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

      <button style={{ height: '50px', width: '200px', fontSize: '20px', margin: '25px' }}>
        {isLoading ? <CircularProgress size={40} color="inherit" /> : 'Crear cuenta'}
      </button>

      {errorMessage && <div className="text-red-500 text-left mb-3">{errorMessage}</div>}

      <Link href="/auth/login" className="mb-5 mt-3 text-center underline">
        Iniciar sesión
      </Link>
      </div>

    </form>
    
  )
}
