import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useChatState from '@/store/ChatState';
import SidebarWithChatList from './SidebarWithChatList';
import { Chat } from '@/interfaces/chat.interface';
import { ReceivedMessageBubble, SentMessageBubble } from './MessageBubbles';
import { useUserStore } from '@/store/user/user-store';
import { SocketManager } from '@/web-sockets/socket-manager';
import { User } from '@/interfaces';

interface ChatViewProps {
  chatTitle: string;
  chats: Chat[] | User[];
  chatType: 'public' | 'private';
  handleChatClick: (id: string) => void;
}

interface Message {
  type: 'sent' | 'received';
  content: string;
  userId: string;
  userName: string;
}

const ChatView: React.FC<ChatViewProps> = ({ chatTitle, chats, chatType, handleChatClick }) => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const { messages, addMessage } = useChatState();
  const { session } = useUserStore();
  const socketManager = SocketManager.getInstance();
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socketManager.getSocket(session!.id);
    return () => {
      socketManager.disconnectSocket();
    };
  }, [addMessage]);

  useEffect(() => {
    const socket = socketManager.getSocket(session!.id);
    const handleChatMessage = (payload: any) => {
      console.log(payload);
      if (payload.data.userId !== session?.id) {
        const newMessage: Message = {
          type: 'received',
          content: payload.data.message,
          userId: payload.data.userId,
          userName: payload.data.userName,
        };
        addMessage(newMessage);
      }
    };
    socket.on('chat-message', handleChatMessage);
    return () => {
      socket.off('chat-message', handleChatMessage);
    };
  }, [messages, session, addMessage, socketManager]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== '' && session) {
      const newMessage: Message = {
        type: 'sent',
        content: currentMessage,
        userId: session.id,
        userName: session.name,
      };
      addMessage(newMessage);
      socketManager.sendMessage(newMessage.content);
      setCurrentMessage('');
    }
  };

  return (
    <Box display="flex" height="89vh">
      <SidebarWithChatList chats={chats} chatType={chatType} handleChatClick={handleChatClick} />
      <Box flex="1" display="flex" flexDirection="column">
        <Box p={2} bgcolor="secondary.main" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="info.main">{chatTitle}</Typography>
        </Box>
        <Box flex="1" p={2} bgcolor="rgba(255, 255, 255, 0.8)" borderBottom="1px solid lightgray" overflow="auto">
          {messages.map((message, index) => (
            message.type === 'sent' ?
              <SentMessageBubble key={index} message={message.content} userId={message.userId} userName={message.userName} /> :
              <ReceivedMessageBubble key={index} message={message.content} userId={message.userId} userName={message.userName} />
          ))}
          <div ref={messagesEndRef} />
        </Box>
        {
          (chatTitle !== 'Group Chat' && chatTitle !== 'Chat with User') && (
            <Box p={2} bgcolor="whitesmoke" borderTop="1px solid lightgray" display="flex">

              <TextField
                fullWidth
                variant='outlined'
                color='secondary'
                placeholder="Type a message"
                InputProps={{ sx: { color: 'black' } }}
                value={currentMessage}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="contained" color="secondary" style={{ marginLeft: '8px' }} onClick={handleSendMessage}>
                <SendIcon />
              </Button>
            </Box>
          )
        }
      </Box>
    </Box>
  );
};

export default ChatView;