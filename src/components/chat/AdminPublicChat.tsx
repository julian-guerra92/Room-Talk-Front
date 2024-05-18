'use client';

import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Chat, FormDataChat } from "@/interfaces/chat.interface"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardMedia, CircularProgress, FormLabel, Grid, Stack, TextField } from "@mui/material";

interface Props {
   chat?: Chat,
   
}

export const AdminPublicChat = ({ chat }: Props) => {

   const [isSaving, setIsSaving] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const [showError, setShowError] = useState(false);

   const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormDataChat>({ defaultValues: chat })

   const fileInputRef = useRef<HTMLInputElement>(null);

   const name = chat?.name;

   const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!target.files) {
         return;
      }
      try {
         setIsLoading(true);
         const formData = new FormData();
         formData.append('file', target.files[0]);
         // const { data } = await myFavoriteCoachNextApi.post<{ message: string }>('/uploadImage', formData);
         const data = { message: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715740390/RoomTalks/constellations-2609647_1280_geaarw.jpg' }
         setValue('referenceImage', data.message, { shouldValidate: true })
      } catch (error) {
         console.log({ error });
      }
   }

   const onDeleteImage = async () => {
      try {
         const imageUrl = getValues('referenceImage');
         // await myFavoriteCoachNextApi.post('/deleteImage', { data: imageUrl });
         setValue(
            'referenceImage',
            undefined,
            { shouldValidate: true }
         )
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <form>
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
                     image={getValues('referenceImage')}
                     alt={getValues('referenceImage')}
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

               <Stack sx={{ width: '100%', display: showError ? 'flex' : 'none' }} spacing={2}>
                  <Alert variant="filled" severity="warning">
                     Se requiere agregar una foto de perfil!
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
         <Box display='flex' justifyContent='end' sx={{ mb: 3, mt:3 }}>
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