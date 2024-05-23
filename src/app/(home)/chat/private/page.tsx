"use client";

import React, { useEffect, useState } from 'react';
import ChatView from '@/components/chat/ChatView';
import useChatState from '@/store/ChatState';
import { dbChat, dbMessage, dbUser } from '@/database';
import { User } from '@/interfaces';
import { SocketManager } from '@/web-sockets/socket-manager';
import { useUserStore } from '@/store';

const PrivateChatPage: React.FC = () => {
  const [contacts, setContacts] = useState<User[]>([]);;
  const { setChatType, setMessages, setSelectedContact } = useChatState();
  const [chatTitle, setChatTitle] = useState('Chat with User');
  const socketManager = SocketManager.getInstance();
  const session = useUserStore((state) => state.session);


  useEffect(() => {
    setMessages([]);
    setChatType('private');
    const fetchChats = async () => {
      const contacts = await dbUser.getAllUSers();
      if (contacts) {
        setContacts(contacts);
      }
    };
    fetchChats();
  }, [setChatType]);

  const handleChatClick = async (id: string) => {
    const contact = contacts.find(contact => contact._id === id);
    if (contact) {
      setSelectedContact(contact);
      setChatTitle(contact.name);
      console.log(contact);
      const chat = await dbChat.createPrivateChat(session!.id, contact._id);
      if (chat) {
        socketManager.chatDisconnection();
        socketManager.chatConnection(chat._id, 'private');
        const chatMessages = await dbMessage.getMessageByChatId(chat._id);
        const messages = chatMessages?.map((message) => {
          return {
            userName: message.senderId === session?.id ? session?.name : contact.name,
            type: message.senderId === session?.id ? 'sent' : 'received',
            content: message.content,
            userId: message.senderId,
          };
        })
        setMessages(messages || []);
      }
    }
  };

  return (
    <ChatView
      chatTitle={chatTitle}
      chats={contacts}
      chatType="private"
      handleChatClick={handleChatClick}
    />
  );
};

export default PrivateChatPage;