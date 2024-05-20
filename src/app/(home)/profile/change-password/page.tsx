'use client';

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useUserStore } from "@/store";
import ChangePasswordForm from "@/components/profile/changePasswordForm"

export default function ChangePasswordPage() {

   const session = useUserStore((state) => state.session);
   const [isSessionChecked, setIsSessionChecked] = useState(false);

   useEffect(() => {
      setIsSessionChecked(true);
   }, [session]);

   if (!isSessionChecked) {
      return <></>
   }

   if (!session) {
      redirect('/');
   }

   return (
      <div className="flex flex-col min-h-screen justify-center items-center pt-32 sm:pt-52">
         <Box sx={{ width: '100%', position: 'relative', margin: '5% 0% 5% 0%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
            <Typography variant="h2" component="div" fontSize={'30px'} sx={{ color: 'white', padding: 1, textAlign: 'center' }}>
               Cambiar contraseña
            </Typography>
            <div style={{ marginLeft: '25%' }}>
               <ChangePasswordForm />
            </div>
         </Box>
      </div>
   )
}