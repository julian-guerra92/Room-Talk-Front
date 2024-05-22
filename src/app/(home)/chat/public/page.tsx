"use client";
import React, { useEffect, useState } from 'react';
import { dbChat } from '@/database/dbChat';
import { Chat } from '@/interfaces/chat.interface';
import ChatView from '@/components/chat/ChatView';
import useChatState from '@/store/ChatState';
import { SocketManager } from '@/web-sockets/socket-manager';

const PublicChatPage: React.FC = () => {
  const [publicChats, setPublicChats] = React.useState<Chat[]>([]);
  const { setChatType, setMessages, setSelectedChat } = useChatState();
  const [chatTitle, setChatTitle] = useState('Group Chat');
  const socketManager = SocketManager.getInstance();

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
    socketManager.chatDisconnection();
    socketManager.chatConnection(chat!._id, 'public');
    if (chat) {
      setSelectedChat(chat);
      setChatTitle(chat.name);
      setMessages([]);
    }
  };

  return (
    <ChatView
      chatTitle={chatTitle}
      chats={publicChats}
      chatType="public"
      handleChatClick={handleChatClick}
    />
  );

};

export default PublicChatPage;