'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { emailValidations } from "../../../../utils";
import { LogginInterface } from "@/interfaces/auth.interface";
import { loggin } from "@/database/dbAuth";

export default function LoginPage() {

   const router = useRouter()
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { register, handleSubmit, formState: { errors } } = useForm<LogginInterface>();

   const onSubmit: SubmitHandler<LogginInterface> = async (data) => {

      setError("");
      setIsLoading(true);

      const result = await loggin (data.email, data.password)
      if (!result) {
         setError("El email o contraseña son incorrectos. Vuelve a ingresar tu información o restablece la contraseña.");
         setIsLoading(false);
      }
      if (result) {
         router.push('/');
      }
   }

   return (
      <>
         <Box sx={{ width: '100%', position: 'relative', margin: '35% 0% 5% 0%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, }}>
            <Typography variant="h2" component="div" fontSize={'30px'} sx={{ color: 'white', padding: 1 }}>
               Inicio de sesión
            </Typography>
         </Box>

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-3">

            <Grid container={true} spacing={2}>

               <Grid item xs={12}>
                  <TextField
                     label="Correo electrónico"
                     variant="outlined"
                     fullWidth
                     {...register('email', {
                        required: 'Este campo es requerido',
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
                     type='password'
                     {...register('password', {
                        required: 'Este campo es requerido',
                     })}
                     error={!!errors.password}
                     helperText={errors.password?.message}
                  />
               </Grid>

            </Grid>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

               <button style={{ height: '50px', width: '200px', fontSize: '20px', margin: '45px' }}>
                  {isLoading ? <CircularProgress size={40} color="inherit" /> : 'Iniciar sesión'}
               </button>

               {error && <div className="text-red-500 text-left mb-3">{error}</div>}

               <Link href="/auth/new-account" className='bg-white text-blue-500 rounded-lg py-3 px-6 text-xl font-bold hover:bg-blue-500 hover:text-white hover:no-underline"'>
                  Crear una cuenta
               </Link>
            </div>
         </form>
      </>

   )
}
