import { create } from 'zustand';
import { Chat, ChatType } from '@/interfaces/chat.interface';
import { User } from '@/interfaces';

interface Message {
  userName: string;
  type: string;
  content: string;
  userId: string;
}

interface ChatState {
  chatType: ChatType;
  selectedChat: Chat | null;
  selectedContact: User | null;
  messages: Message[];
  setChatType: (type: ChatType) => void;
  setSelectedChat: (chat: Chat) => void;
  setSelectedContact: (contact: User) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

const useChatState = create<ChatState>((set) => ({
  chatType: 'public',
  selectedChat: null,
  selectedContact: null,
  messages: [],
  setChatType: (type: ChatType) => set({ chatType: type }),
  setSelectedChat: (chat: Chat) => set({ selectedChat: chat }),
  setSelectedContact: (contact: User) => set({ selectedContact: contact }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));

export default useChatState;