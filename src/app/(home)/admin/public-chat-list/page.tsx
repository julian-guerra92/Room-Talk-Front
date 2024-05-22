"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import { dbChat } from '@/database/dbChat';
import { Chat } from '@/interfaces/chat.interface';
import { AddOutlined } from '@mui/icons-material';

const PublicChatListPage = () => {
  const [publicChats, setPublicChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await dbChat.fetchPublicChats();
        setPublicChats(chats);
      } catch (error) {
        console.error('Failed to fetch public chats:', error);
      }
    };
    fetchChats();
  }, []);

  const handleChatClick = (id: string) => {
    router.push(`/admin/public-chats/${id}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Public Chats
      </Typography>
      <List>
        {publicChats.map((chat) => (
          <ListItem key={chat._id} button onClick={() => handleChatClick(chat._id)}>
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
                    Participants: {chat.participants.map(p => p.name).join(', ')}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <IconButton
        href='/admin/public-chats/create'
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'secondary.main',
          ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 50 }} />
      </IconButton>
    </Box>
  );
};

export default PublicChatListPage;