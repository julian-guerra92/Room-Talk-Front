
'use client';

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import { Chat, FormDataChat } from "@/interfaces/chat.interface"
import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardMedia, CircularProgress, FormControl, FormHelperText, Grid, Input, InputLabel, Stack, TextField } from "@mui/material";
import { dbChat } from "@/database";
import { Alerts } from "../../../components/ui";
import { FormDataUser, User } from "@/interfaces/user.interface";
import { useUserStore } from "@/store/user/user-store";
import { updateUser } from "@/database/dbAuth";
import { emailValidations } from "../../../../utils";

interface Props {
   user?: User,
}

const defaultImage = 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1716072021/RoomTalks/sin-foto_ijhgmn.jpg';


export default function ProfilePage({ user }: Props) {

   const router = useRouter();
   const [isSaving, setIsSaving] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showError, setShowError] = useState(false);
   const [confirmUpdate, setConfirmUpdate] = useState(false);
   const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormDataUser>({ defaultValues: user })

   const fileInputRef = useRef<HTMLInputElement>(null);
   const [previewImage, setPreviewImage] = useState<string | null>(null);
   const session = useUserStore((state) => state.session);

   const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!target.files) {
         return;
      }
      try {
         setIsLoading(true);
         const file = target.files[0];
         const imageUrl = URL.createObjectURL(file);
         console.log({ imageUrl })
         setPreviewImage(imageUrl);
         setValue('file', file, { shouldValidate: true });
         setIsLoading(false);
      } catch (error) {
         console.log({ error });
      }
   }

   const onsubmit = async (data: FormDataUser) => {
      
      if (!data.file) {
         console.log(data.file)
         setShowError(true);
         return;
      }

     const name = data.name || session?.name;
     const email = data.email || session?.email;
     const address = data.address || session?.address;

      try {
         setIsSaving(true);
         const result = await updateUser(data.file, name, email, address)
         if (!result) {
            //setShowError("El email o contraseña son incorrectos. Vuelve a ingresar tu información o restablece la contraseña.");
            setIsLoading(false);
            return
         }else{
            setConfirmUpdate(true);
            router.push('/');
         }
      } catch (error) {
         console.log({ error });
         setIsSaving(false);
      }  
   }


   return (
      <>

         <form onSubmit={handleSubmit(onsubmit)}>
            <Grid
               sx={{ flexGrow: 1 }}
               container
               spacing={2}
               style={{ width: '70%', margin: '0 auto' }}
               alignItems="center"
            >
               <Grid item xs={12}>

                  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <CardMedia
                        component='img'
                        className='fadeIn'
                        image={previewImage || getValues('file') || defaultImage}
                        alt={getValues('file' || 'Default Image')}
                        sx={{ borderRadius: '50%', height: '300px', width: '300px' }}
                     />
                     <CardActions sx={{ position: 'absolute', marginTop: '230px' }}>
                        <Button
                           color="secondary"
                           variant='contained'
                           size='large'
                           startIcon={<UploadOutlined fontSize='large' />}
                           disabled={isLoading}
                           onClick={() => fileInputRef.current?.click()}
                           sx={{ width: '150px' }}
                        >
                           {
                              isLoading
                                 ? (
                                    <CircularProgress color='inherit' size={25} />
                                 )
                                 : 'Seleccionar'
                           }
                        </Button>
                        <input
                           ref={fileInputRef}
                           type='file'
                           multiple
                           accept='image/png, image/gif, image/jpeg'
                           style={{ display: 'none' }}
                           onChange={onFileSelected}
                        />
                     </CardActions>
                  </Card>

                  <Stack sx={{ width: '100%', display: showError ? 'flex' : 'none' }} mt={2}>
                     <Alert variant="filled" severity="warning">
                        Se requiere agregar una foto de referencia!
                     </Alert>
                  </Stack>

               </Grid>


               <Grid item xs={5}>
                  <TextField
                     fullWidth
                     //label="Nombre"
                     variant="outlined"
                     color="info"
                     defaultValue={session?.name}
                     sx={{ mt: 4 }}
                  {...register('name', {
                     maxLength: { value: 50, message: 'Máximo 50 caracteres' }
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  />
               </Grid>

               <Grid item xs={5}>
               <TextField
                     fullWidth
                     //label="Email"
                     variant="outlined"
                     color="info"
                     /*defaultValue={session?.email}*/
                     sx={{ mt: 4 }}
                     //disabled = {true}
                     value = {session?.email}
                     {...register('email',{
                     })}
                     error={!!errors.email}
                     helperText={errors.email?.message}
                  />             
               </Grid>

               <Grid item xs={5}>
                  <TextField
                     fullWidth
                     //label="Dirección"
                     variant="outlined"
                     color="info"
                     defaultValue={session?.address}
                     sx={{ mt: 4 }}
                     {...register("address", {
                      })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                  />
               </Grid>

               {
                  confirmUpdate && (
                     <Alerts text='Guardado exitoso!' type='info' />
                  )
               }

               <Box display='flex' justifyContent='end' sx={{ mb: 3, mt: 8 }}>
                  <Button
                     color="secondary"
                     variant='contained'
                     startIcon={<SaveOutlined fontSize='large' />}
                     sx={{ width: '350px', mt: 2, margin: '1rem 3rem' }}
                     type="submit"
                     size='large'
                     disabled={isSaving}
                     onClick={() => router.push('/profile/change-password')}
                  >
                     Cambiar contraseña
                  </Button>
               </Box>

               <Box display='flex' justifyContent='end' sx={{ mb: 3, mt: 3 }}>
                  <Button
                     color="secondary"
                     variant='contained'
                     startIcon={<SaveOutlined fontSize='large' />}
                     sx={{ width: '150px', mt: 2 }}
                     type="submit"
                     size='large'
                     disabled={isSaving}
                  >
                     Guardar
                  </Button>
               </Box>

            </Grid>

         </form>
      </>
   );
}

