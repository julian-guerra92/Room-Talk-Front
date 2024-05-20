import { Metadata } from "next";
import { AdminPublicChat } from "@/components/chat/AdminPublicChat";
import { Title } from "@/components/ui/Title";
import { dbChat } from "@/database";
import { notFound } from "next/navigation";

interface Props {
   params: {
      id: string;
   }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = params;
   const chat = await dbChat.getChatById(id);
   return {
      title: chat?.name ?? 'Chat not found',
      description: chat?.description ?? '',
      openGraph: {
         title: chat?.name ?? 'Chat not found',
         description: chat?.description ?? '',
         images: [`/public-chat/${chat?.referenceImage}`]
      }
   }
}

export default async function ChatByIdPage({ params }: Props) {
   const { id } = params;
   const chat = await dbChat.getChatById(id);

   if (!chat) {
      notFound();
   }

   return (
      <>
         <Title title="Editar Public Chat" />
         <AdminPublicChat chat={chat} />
      </>
   )
}