
'use client';

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import { Chat, FormDataChat } from "@/interfaces/chat.interface"
import { Padding, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardMedia, CircularProgress, FormControl, FormHelperText, Grid, Input, InputLabel, Stack, TextField } from "@mui/material";
import { dbChat } from "@/database";
import { Alerts, Title } from "../../../components/ui";
import { FormDataUser, User } from "@/interfaces/user.interface";
import { useUserStore } from "@/store/user/user-store";
import { updateUser } from "@/database/dbAuth";
import { emailValidations } from "../../../../utils";
import { UserSession } from "@/interfaces/userSession.interface";

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
   const setSession = useUserStore((state) => state.setSession);

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
      
     const name = data.name || session?.name;
     const email = data.email || session?.email;
     const address = data.address || session?.address;

      try {
         setIsSaving(true);
         const result = await updateUser(data.file, name, email, address)
         if (!result) {
            setIsLoading(false);
            return
         }else{
            setConfirmUpdate(true);
            const session: UserSession = {
               id: result.id,
               name: result.name,
               email: result.email,
               address: result.address,
               role: result.role,
               image: result.image
            }
            setSession(session)
            router.push('/');
         }
      } catch (error) {
         console.log({ error });
         setIsSaving(false);
      }  
   }


   return (
      <>
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title title="Editar perfil" />
         </Box>

         <form onSubmit={handleSubmit(onsubmit)}>
            <Grid
               container
               spacing={0.5}
               style={{ width: '50%', margin: '0% 35%' }}
               alignItems="center"
            >
               <Grid item xs={7}>

                  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <CardMedia
                        component='img'
                        className='fadeIn'
                        image={previewImage || session?.image || defaultImage}
                        alt={session?.image || defaultImage}
                        sx={{ borderRadius: '50%', height: '150px', width: '150px' }}
                     />
                     <CardActions sx={{ position: 'absolute', marginTop: '110px' }}>
                        <Button
                           color="secondary"
                           variant='contained'
                           size='large'
                           startIcon={<UploadOutlined fontSize='large' />}
                           disabled={isLoading}
                           onClick={() => fileInputRef.current?.click()}
                           sx={{ width: '120px' }}
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

               </Grid>


               <Grid item xs={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                  <TextField
                     fullWidth
                     color="info"
                     defaultValue={session?.name}
                     sx={{ mt: 2 }}
                  {...register('name', {
                     maxLength: { value: 50, message: 'Máximo 50 caracteres' }
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  />
               </Grid>

               <Grid item xs={7}>
               <TextField
                     fullWidth
                     color="info"
                     value = {session?.email}
                     {...register('email',{
                     })}
                     error={!!errors.email}
                     helperText={errors.email?.message}
                  />             
               </Grid>

               <Grid item xs={7}>
                  <TextField
                     fullWidth
                     color="info"
                     defaultValue={session?.address}
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

                  <Grid item xs={12}>
                  <Button
                     color="secondary"
                     variant='contained'
                     sx={{ width: '180px'}}
                     type="submit"
                     size='large'
                     disabled={isSaving}
                     onClick={() => router.push('/profile/change-password')}
                  >
                     Cambiar contraseña
                  </Button>

                   <Button
                     color="secondary"
                     variant='contained'
                     startIcon={<SaveOutlined fontSize='large' />}
                     sx={{ width: '170px', margin: '0% 3%'}}
                     type="submit"
                     size='large'
                     disabled={isSaving}
                  >
                     Guardar
                  </Button>
               
                  </Grid>
                  
               

              
                 

            </Grid>

         </form>
      </>
   );
}

