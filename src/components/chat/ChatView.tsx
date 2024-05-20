import React from 'react';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import useChatState from '@/store/ChatState';
import SidebarWithChatList from './SidebarWithChatList';
import { Chat } from '@/interfaces/chat.interface';

interface ChatViewProps {
  chatTitle: string;
  messages: { type: string; content: string }[];
  chats: Chat[];
  chatType: 'public' | 'private';
  handleChatClick: (id: string) => void;
}

const ReceivedMessageBubble: React.FC<{ message: string }> = ({ message }) => (
  <div style={{ backgroundColor: 'lightgrey', color: 'black', padding: '5px', borderRadius: '10px', marginBottom: '10px' }}>
    {message}
  </div>
);

const SentMessageBubble: React.FC<{ message: string }> = ({ message }) => (
  <div style={{ backgroundColor: 'darkgrey', color: 'white', padding: '5px', borderRadius: '10px', marginBottom: '10px' }}>
    {message}
  </div>
);

const ChatView: React.FC<ChatViewProps> = ({ chatTitle, messages, chats, chatType, handleChatClick }) => {
  return (
    <Box display="flex" height="89vh">
      <SidebarWithChatList chats={chats} chatType={chatType} handleChatClick={handleChatClick} />
      <Box flex="1" display="flex" flexDirection="column">
        <Box p={2} bgcolor="secondary.main" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="info.main">{chatTitle}</Typography>
          <Box>
            <IconButton>
              {chatType === 'private' ? <PersonIcon sx={{ color: 'info.main' }} /> : <GroupIcon sx={{ color: 'info.main' }} />}
            </IconButton>
            <IconButton>
              <SettingsIcon sx={{ color: 'info.main' }} />
            </IconButton>
          </Box>
        </Box>
        <Box flex="1" p={2} bgcolor="rgba(255, 255, 255, 0.8)" borderBottom="1px solid lightgray" overflow="auto">
          {messages.map((message, index) => (
            message.type === 'sent' ?
              <SentMessageBubble key={index} message={message.content} /> :
              <ReceivedMessageBubble key={index} message={message.content} />
          ))}
        </Box>
        <Box p={2} bgcolor="whitesmoke" borderTop="1px solid lightgray" display="flex">
          <TextField fullWidth variant="outlined" placeholder="Type a message" InputProps={{ sx: { color: 'black' } }} />
          <Button variant="contained" color="secondary" style={{ marginLeft: '8px' }}>
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatView;