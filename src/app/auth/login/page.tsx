'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { emailValidations } from "../../../../utils";
import { LogginInterface } from "@/interfaces/auth.interface";



interface CreateNewUserInterface {
   userId: string;
   userIdTipe: string;
   userName: string;
   userLastname: string;
   userPhoneNumber: string;
   userEmail: string;
   userPassword: string;
   roleId: number;
}

export default function LoginPage() {

   const router = useRouter()
   const [error, setError] = useState("");
   const [response, setResponse] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const { register, handleSubmit, formState: { errors } } = useForm<LogginInterface>();

   const callLogin = async (data: LogginInterface) => {
      try {
         const res = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
         });
         if (!res.ok) {
            setError("El email o contraseña son incorrectos. Vuelve a ingresar tu información o restablece la contraseña.");
            setIsLoading(false);
         }
         if (res?.ok) {
            router.push('/');
         }
         return res;
      } catch (err) {
         console.log(err);
      }
   };

   const onSubmit: SubmitHandler<LogginInterface> = async (data) => {
      setError("");
      setIsLoading(true);

      const result = callLogin(data);
      console.log(result)
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
