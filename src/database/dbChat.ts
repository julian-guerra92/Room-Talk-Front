import roomTalkApi from "@/api/room-talk-api";
import { Chat, FormDataChat } from "@/interfaces/chat.interface";


export const createPublicChat = async (chat: FormDataChat): Promise<Chat | null> => {
   try {
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
   } catch (error) {
      console.log(error);
      return null;
   }
}

export const getChayById = async (id: string): Promise<Chat | null> => {
   try {
      const { data } = await roomTalkApi.get(`/chat/${id}`);
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}

export const updatePublicChat = async (chat: FormDataChat, id: string): Promise<Chat | null> => {
   try {
      const formData = new FormData();
      formData.append('file', chat.referenceImage);
      formData.append('name', chat.name);
      formData.append('description', chat.description);
      const { data } = await roomTalkApi.put(`/chat/${id}`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}