"use client";
import React, { useEffect, useState } from 'react';
import ChatView from '@/components/chat/ChatView';
import useChatState from '@/store/ChatState';
import { dbChat } from '@/database/dbChat';
import { Chat } from '@/interfaces/chat.interface';

const PublicChatPage: React.FC = () => {
  const [publicChats, setPublicChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatTitle, setChatTitle] = useState('Group Chat');
  const { setChatType } = useChatState();

  useEffect(() => {
    setChatType('public');
    const fetchChats = async () => {
      try {
        const chats = await dbChat.fetchPublicChats();
        setPublicChats(chats);
      } catch (error) {
        console.error('Failed to fetch public chats:', error);
      }
    };
    fetchChats();
  }, [setChatType]);

  const handleChatClick = async (id: string) => {
      const chat = publicChats.find(chat => chat._id === id);
      if (chat) {
        setChatTitle(chat.name);
        setMessages([
          { type: 'received', content: 'This is a sample message in public chat!' },
          { type: 'sent', content: 'Hello from public chat!' },
        ]);
      }
  };

  return (
    <ChatView
      chatTitle={chatTitle}
      messages={messages}
      chats={publicChats}
      chatType="public"
      handleChatClick={handleChatClick}
    />
  );
};

export default PublicChatPage;