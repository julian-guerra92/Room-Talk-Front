'use client';

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Box from '@mui/material/Box';
import { useUserStore } from "@/store";
import ChangePasswordForm from "@/components/profile/changePasswordForm"
import { Title } from "@/components/ui";

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
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
         <Title title="Cambio de Contraseña" />
         <ChangePasswordForm />
      </Box>
   )
}