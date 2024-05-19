'use client';

import { ChangeEvent, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { Chat, FormDataChat } from "@/interfaces/chat.interface"
import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardMedia, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import { createPublicChat } from "@/database/dbChat";
import { useRouter } from "next/navigation";

interface Props {
   chat?: Chat,
}

const defaultImage = 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1716072021/RoomTalks/sin-foto_ijhgmn.jpg';
export const AdminPublicChat = ({ chat }: Props) => {

   const router = useRouter();
   const [isSaving, setIsSaving] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showError, setShowError] = useState(false);
   const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<FormDataChat>({ defaultValues: chat })
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [previewImage, setPreviewImage] = useState<string | null>(null);

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
         setValue('referenceImage', file, { shouldValidate: true });
         setIsLoading(false);
      } catch (error) {
         console.log({ error });
      }
   }

   const onsubmit = async (data: FormDataChat) => {
      if (!data.referenceImage) {
         setShowError(true);
         setTimeout(() => setShowError(false), 4000);
         return;
      }
      try {
         setIsSaving(true);
         let newChat: Chat;
         if (chat) {
            newChat = { ...chat, ...data };
         } else {
            newChat = await createPublicChat(data);
         }
         setIsSaving(false);
         router.push(`/admin/public-chats/${1}`);
      } catch (error) {
         console.log({ error });
         setIsSaving(false);
      }
   }

   return (
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
                     image={previewImage || getValues('referenceImage') || defaultImage}
                     alt={getValues('referenceImage' || 'Default Image')}
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


            <Grid item xs={12}>
               <TextField
                  fullWidth
                  label="Nombre Sala"
                  variant="outlined"
                  color="info"
                  sx={{ mt: 4 }}
                  {...register('name', {
                     required: 'Campo requerido',
                     maxLength: { value: 20, message: 'Máximo 20 caracteres' }
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
               />
            </Grid>

            <Grid item xs={12}>
               <TextField
                  fullWidth
                  label="Descripción"
                  variant="outlined"
                  color="info"
                  multiline
                  rows={4}
                  sx={{ mt: 2 }}
                  {...register('description', {
                     required: 'Campo requerido',
                     maxLength: { value: 150, message: 'Máximo 150 caracteres' }
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
               />
            </Grid>

         </Grid>
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
      </form>
   );
}