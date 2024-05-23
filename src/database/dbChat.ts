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

export const createPrivateChat = async (senderUserId: string, receiverUserId: string): Promise<Chat | null> => {
   try {
      const { data } = await roomTalkApi.post('/chat/private', {
         senderUserId,
         receiverUserId,
      });
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}

export const getChatById = async (id: string): Promise<Chat | null> => {
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


export const dbChat = {
   async fetchPublicChats(): Promise<Chat[]> {
      try {
         const { data } = await roomTalkApi.get('/chat/public');
         return data;
      } catch (error) {
         console.error('Error fetching public chats:', error);
         throw error;
      }
   },

   async fetchPrivateChats(): Promise<Chat[]> {
      try {
         const { data } = await roomTalkApi.get('/chat/private');
         return data;
      } catch (error) {
         console.error('Error fetching private chats:', error);
         throw error;
      }
   },

};