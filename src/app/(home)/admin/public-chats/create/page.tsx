import { AdminPublicChat } from "@/components/chat/AdminPublicChat";
import { Title } from "@/components/ui/Title";
import { Metadata } from "next";


export const metadata: Metadata = {
   title: 'Create Public Chat',
   description: 'Create a public chat'
}


export default function ProfilePage() {
   return (
      <>
         <Title title="Crear Public Chat"/>
         <AdminPublicChat />
      </>
   )
}