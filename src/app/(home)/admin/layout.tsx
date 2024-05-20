'use client';

import { useUserStore } from "@/store";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default function AdminLayout({ children }: { children: React.ReactNode }) {

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
      <div style={{ padding: '20px 30px' }}>
         {children}
      </div>
   )
}