'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { emailValidations } from "../../../../utils";
import { LogginInterface } from "@/interfaces/auth.interface";
import { loggin } from "@/database/dbAuth";
import { useUserStore } from "@/store/user/user-store";
import { UserSession } from "@/interfaces/userSession.interface";
import { Title } from "@/components/ui";

export default function LoginPage() {

   const router = useRouter()
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { register, handleSubmit, formState: { errors } } = useForm<LogginInterface>();

   const setSession = useUserStore((state) => state.setSession);

   const onSubmit: SubmitHandler<LogginInterface> = async (data) => {
      setError("");
      setIsLoading(true);
      const result = await loggin(data.email, data.password)
      if (!result) {
         setError("El email o contraseña son incorrectos. Vuelve a ingresar tu información o restablece la contraseña.");
         setIsLoading(false);
         return
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
      <>
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title title="Inicio de Sesión" />
         </Box>

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-3">

            <Grid container={true} spacing={2}>

               <Grid item xs={12}>
                  <TextField
                     label="Correo electrónico"
                     variant="outlined"
                     color="info"
                     fullWidth
                     autoComplete="off"
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
                     color="info"
                     fullWidth
                     autoComplete="off"
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
                        : 'Iniciar sesión'
                  }
               </Button>

               {error &&
                  <Typography variant='body1' color='error' style={{ maxWidth: '450px', marginBottom:'10px' }}>
                     {error}
                  </Typography>
               }

               <Link href="/auth/new-account" style={{ color: 'white' }}>
                  No tienes aún una cuenta? Crea una cuenta!
               </Link>
            </div>
         </form>
      </>

   )
}
