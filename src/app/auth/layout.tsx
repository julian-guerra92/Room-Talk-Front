//import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';


export default async function ShopLayout({ children }: { children: React.ReactNode }) {

   const session = {
      user: false
   };

   if (session?.user) {
      redirect('/');
   }

   return (
      <main className="flex justify-center">
         <div>
            {children}
         </div>
      </main>
   );
}