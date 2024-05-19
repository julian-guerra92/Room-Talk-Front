import roomTalkApi from "@/api/room-talk-api";
import { Chat, FormDataChat } from "@/interfaces/chat.interface";


export const createPublicChat = async (chat: FormDataChat): Promise<Chat> => {
   const formData = new FormData();
   formData.append('file', chat.referenceImage);
   formData.append('name', chat.name);
   formData.append('description', chat.description);
   const { data } = await roomTalkApi.post('/chat/public', formData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });
   return data;
}