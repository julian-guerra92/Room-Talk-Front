import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Typography } from '@mui/material';
import { titleFont } from '@/config/fonts';

function srcset(image: string, size: number, rows = 1, cols = 1) {
   return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
         }&fit=crop&auto=format&dpr=2 2x`,
   };
}

const itemData = [
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715624722/RoomTalks/conversation-8329680_1280_iqx0vu.png',
      title: 'Girls chat',
      rows: 2,
      cols: 2,
   },
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715624722/RoomTalks/laptop-2561505_1280_xflqcb.jpg',
      title: 'Boy with tour pc',
   },
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715624722/RoomTalks/woman-6010924_1280_d7yc2x.jpg',
      title: 'Chat in pc',
   },
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715624722/RoomTalks/office-desk-5954672_1280_g8vdkg.jpg',
      title: 'Chat in celphone',
      cols: 2,
   },
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715626299/RoomTalks/student-849822_1280_pwmvs1.jpg',
      title: 'Hats',
      cols: 2,
   },
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715626299/RoomTalks/internet-3113279_1280_bvgm2e.jpg',
      title: 'chats',
      rows: 2,
      cols: 2,
   },
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715626298/RoomTalks/iphone-410324_1280_gtfiij.jpg',
      title: 'Chat in pc',
   },
   {
      img: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715626642/RoomTalks/iphone-500291_1280_hsnsgq.jpg',
      title: 'Chat in pc',
   },
];

export default function Home() {
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 1
         }}
      >
         <ImageList
            sx={{ width: 600, height: 500 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
         >
            {itemData.map((item) => (
               <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                     {...srcset(item.img, 121, item.rows, item.cols)}
                     alt={item.title}
                     loading="lazy"
                  />
               </ImageListItem>
            ))}
         </ImageList>
         <Typography
            variant="h1"
            sx={{
               position: 'absolute',
               border: 'solid',
               padding: '15px',
               borderRadius: '20px',
               backgroundColor: 'rgba(255, 255, 255, 0.8)',
               color: 'rgba(44, 62, 80, 1)',
               textAlign: 'center',
            }}
            className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
         >
            Bienvenido a RoomTalks!
            <Typography variant="body1">Conectando Mentes, Creando Conversaciones</Typography>
         </Typography>
      </Box>
   );
}


