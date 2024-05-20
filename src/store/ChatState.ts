import { create } from 'zustand';
import { Chat, ChatType } from '@/interfaces/chat.interface';

interface ChatState {
  chatType: ChatType;
  selectedChat: Chat | null;
  messages: { type: string; content: string }[];
  setChatType: (type: ChatType) => void;
  setSelectedChat: (chat: Chat) => void;
  setMessages: (messages: { type: string; content: string }[]) => void;
}

const useChatState = create<ChatState>((set) => ({
  chatType: 'public',
  selectedChat: null,
  messages: [],
  setChatType: (type: ChatType) => set({ chatType: type }),
  setSelectedChat: (chat: Chat) => set({ selectedChat: chat }),
  setMessages: (messages) => set({ messages }),
}));

export default useChatState;