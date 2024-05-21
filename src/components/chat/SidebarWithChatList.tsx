import React from 'react';
import { Box, Typography, List, ListItem, Avatar } from '@mui/material';
import { Chat } from '@/interfaces/chat.interface';

interface SidebarWithChatListProps {
  chats: Chat[];
  chatType: 'public' | 'private';
  handleChatClick: (id: string) => void;
}

const SidebarWithChatList: React.FC<SidebarWithChatListProps> = ({ chats, chatType, handleChatClick }) => (
  <Box width="25%" bgcolor="primary.main" p={2} borderRight="1px solid lightgray" overflow="auto">
    <Typography variant="h6" gutterBottom color="info.main">
      {chatType === 'private' ? 'Private Chats' : 'Public Chats'}
    </Typography>
    <List>
      {chats.map((chat) => (
        <ListItem key={chat._id} button onClick={() => handleChatClick(chat._id)}>
          <Avatar src={chat.referenceImage} />
          <Box ml={2}>
            <Typography variant="body1" color="info.main">
              {chat.name}
            </Typography>
            {chatType === 'public'}
          </Box>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default SidebarWithChatList;