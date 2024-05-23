import roomTalkApi from "@/api/room-talk-api";
import { ChatMessage } from "@/interfaces/message.interface";



export const getMessageByChatId = async (chatId: string): Promise<ChatMessage[] | null> => {
   try {
      const { data } = await roomTalkApi.get(`/message/get-messages/${chatId}`);
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}