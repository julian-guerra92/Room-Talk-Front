import roomTalkApi from '@/api/room-talk-api';
import { Chat } from '@/interfaces/chat.interface';

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

  /*async fetchChatMessages(chatId: string): Promise<any> {
    try {
      const { data } = await roomTalkApi.get(`/chat/${chatId}/messages`);
      return data;
    } catch (error) {
      console.error(`Error fetching messages for chat ${chatId}:`, error);
      throw error;
    }
  }*/
};