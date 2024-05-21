import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import useChatState from '@/store/ChatState';
import SidebarWithChatList from './SidebarWithChatList';
import { Chat } from '@/interfaces/chat.interface';
import { ReceivedMessageBubble, SentMessageBubble } from './MessageBubbles';
import { useUserStore } from '@/store/user/user-store';

interface ChatViewProps {
  chatTitle: string;
  chats: Chat[];
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
  const { session } = useUserStore(); // Obtener la sesión del usuario desde el store
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    //----> Conectar al websocket - Julián
    socket.current = new WebSocket('ws://tu-servidor-websocket');
    socket.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      addMessage({ ...messageData, type: 'received' });
    };
    return () => {
      //----> Limpiar la conexión del websocket al desmontar el componente - Julián
      socket.current?.close();
    };
  }, [addMessage]);

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
      socket.current?.send(JSON.stringify(newMessage));
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
        </Box>
        <Box p={2} bgcolor="whitesmoke" borderTop="1px solid lightgray" display="flex">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            InputProps={{ sx: { color: 'black' } }}
            value={currentMessage}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="secondary" style={{ marginLeft: '8px' }} onClick={handleSendMessage}>
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatView;