"use client";
import React, { useEffect, useState } from 'react';
import ChatView from '@/components/chat/ChatView';
import useChatState from '@/store/ChatState';
import { dbChat } from '@/database/dbChat';
import { Chat } from '@/interfaces/chat.interface';

const PrivateChatPage: React.FC = () => {
  const [privateChats, setPrivateChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatTitle, setChatTitle] = useState('Chat with User');
  const { setChatType } = useChatState();

  useEffect(() => {
    setChatType('private');
    const fetchChats = async () => {
      try {
        const chats = await dbChat.fetchPrivateChats();
        setPrivateChats(chats);
      } catch (error) {
        console.error('Failed to fetch private chats:', error);
      }
    };
    fetchChats();
  }, [setChatType]);

  const handleChatClick = async (id: string) => {
      const chat = privateChats.find(chat => chat._id === id);
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
      chats={privateChats}
      chatType="private"
      handleChatClick={handleChatClick}
    />
  );
};

export default PrivateChatPage;