"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const publicChats = [
  {
    id: 1,
    name: 'Public Chat 1',
    description: 'Description for Public Chat 1',
    referenceImage: 'path-to-chat1.jpg',
    type: 'public',
    participants: ['User1', 'User2'],
  },
  {
    id: 2,
    name: 'Public Chat 2',
    description: 'Description for Public Chat 2',
    referenceImage: 'path-to-chat2.jpg',
    type: 'public',
    participants: ['User3', 'User4'],
  },
  {
    id: 3,
    name: 'Public Chat 3',
    description: 'Description for Public Chat 3',
    referenceImage: 'path-to-chat3.jpg',
    type: 'public',
    participants: ['User5', 'User6'],
  },
];

const PublicChatListPage = () => {
  const router = useRouter();

  const handleChatClick = (id: number) => {
    router.push(`/public-chat/${id}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Public Chats
      </Typography>
      <List>
        {publicChats.map((chat) => (
          <ListItem key={chat.id} button onClick={() => handleChatClick(chat.id)}>
            <ListItemAvatar>
              <Avatar src={chat.referenceImage} />
            </ListItemAvatar>
            <ListItemText
              primary={chat.name}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {chat.description}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    Participants: {chat.participants.join(', ')}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PublicChatListPage;