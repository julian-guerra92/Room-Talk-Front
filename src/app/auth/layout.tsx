'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';

export default function AuthLayout({ children }: { children: React.ReactNode }) {

   //const { status } = useSession();

   useEffect(() => {
      if (status === 'authenticated') {
         redirect('/');
      }
   }, [status]);

   if (status === 'loading') {
      return <> </>;
   }

   return (
      <div className="flex flex-col min-h-screen justify-between">


         <div className="flex justify-center bg-gray-100 flex-grow">
            <Box sx={{width: '30%', borderRadius: '40px', color: 'rgba(44, 62, 80, 1)', margin: '3% 35% '}} >
               <div className="sm:w-[600px] px-10">
                  {children}
               </div>
            </Box>
         </div>

      </div>
   );

}