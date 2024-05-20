'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import { useUserStore } from '@/store';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

   const session = useUserStore((state) => state.session);
   const [isSessionChecked, setIsSessionChecked] = useState(false);

   useEffect(() => {
      if (session) {
         redirect('/');
      }
      setIsSessionChecked(true);
   }, [session]);

   if (!isSessionChecked) {
      return <></>
   }

   return (
      <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginTop:'30px' }} >
         <div className="sm:w-[600px]">
            {children}
         </div>
      </Box>
   );

}