import { create } from 'zustand';
import { Chat, ChatType } from '@/interfaces/chat.interface';

interface Message {
  type: string;
  content: string;
  userId: string;
}

interface ChatState {
  chatType: ChatType;
  selectedChat: Chat | null;
  messages: Message[];
  setChatType: (type: ChatType) => void;
  setSelectedChat: (chat: Chat) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

const useChatState = create<ChatState>((set) => ({
  chatType: 'public',
  selectedChat: null,
  messages: [],
  setChatType: (type: ChatType) => set({ chatType: type }),
  setSelectedChat: (chat: Chat) => set({ selectedChat: chat }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));

export default useChatState;