import { Metadata } from "next";
import { AdminPublicChat } from "@/components/chat/AdminPublicChat";
import { Chat } from "@/interfaces/chat.interface";
import { Title } from "@/components/ui/Title";

const publicChats = [
   {
      id: '1',
      name: 'Public Chat 1',
      type: 'public',
      description: 'Public Chat 1',
      participants: [],
      referenceImage: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715740390/RoomTalks/constellations-2609647_1280_geaarw.jpg'
   },
   {
      id: '2',
      name: 'Public Chat 2',
      type: 'public',
      description: 'Public Chat 2',
      participants: [],
      referenceImage: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715740357/RoomTalks/camera-1130731_1280_hqvhtb.jpg'
   },
   {
      id: '3',
      name: 'Public Chat 3',
      type: 'public',
      description: 'Public Chat 3',
      participants: [],
      referenceImage: 'https://res.cloudinary.com/dq0yax1nl/image/upload/v1715740357/RoomTalks/ice-climbing-1247606_1280_h66oht.jpg'
   }
]


interface Props {
   params: {
      id: string;
   }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = params;
   const chat = publicChats.find(chat => chat.id === id); //TODO: Petición a API
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
   const chat = publicChats.find(chat => chat.id === id) as Chat; //TODO: Petición a API

   if (!chat) {
      return <div>Chat not found</div>
   }

   return (
      <>
         <Title title="Edit Public Chat"/>
         <AdminPublicChat chat={chat} />
      </>
   )
}