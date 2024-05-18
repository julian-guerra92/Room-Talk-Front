"use client";

import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button, Avatar, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

const ChatApp = () => {
  const [chatType, setChatType] = useState('private');

  const handleChatTypeChange = (event, newChatType) => {
    if (newChatType !== null) {
      setChatType(newChatType);
    }
  };

  const privateChats = (
    <List>
      <ListItem button>
        <Avatar alt="User 1" src="/path-to-avatar1.jpg" />
        <ListItemText primary="Chat 1" />
      </ListItem>
      <ListItem button>
        <Avatar alt="User 2" src="/path-to-avatar2.jpg" />
        <ListItemText primary="Chat 2" />
      </ListItem>
      <ListItem button>
        <Avatar alt="User 3" src="/path-to-avatar3.jpg" />
        <ListItemText primary="Chat 3" />
      </ListItem>
    </List>
  );

  const publicChats = (
    <List>
      <ListItem button>
        <Avatar alt="Group 1" src="/path-to-group1-avatar.jpg" />
        <ListItemText primary="Group Chat 1" />
      </ListItem>
      <ListItem button>
        <Avatar alt="Group 2" src="/path-to-group2-avatar.jpg" />
        <ListItemText primary="Group Chat 2" />
      </ListItem>
      <ListItem button>
        <Avatar alt="Group 3" src="/path-to-group3-avatar.jpg" />
        <ListItemText primary="Group Chat 3" />
      </ListItem>
    </List>
  );

  return (
    <Box display="flex" height="90vh">
      {/* Sidebar with chat list */}
      <Box width="25%" bgcolor="whitesmoke" p={2} borderRight="1px solid lightgray" overflow="auto">
        <Typography variant="h6" gutterBottom>Chats</Typography>
        <ToggleButtonGroup
          value={chatType}
          exclusive
          onChange={handleChatTypeChange}
          aria-label="chat type"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <ToggleButton value="private" aria-label="private chats">
            Private Chats
          </ToggleButton>
          <ToggleButton value="public" aria-label="public chats">
            Public Chats
          </ToggleButton>
        </ToggleButtonGroup>
        {chatType === 'private' ? privateChats : publicChats}
      </Box>

      {/* Chat view */}
      <Box flex="1" display="flex" flexDirection="column">
        {/* Menu options */}
        <Box p={2} bgcolor="lightgray" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{chatType === 'private' ? 'Chat with User' : 'Group Chat'}</Typography>
          <Box>
            <IconButton>
              {chatType === 'private' ? <PersonIcon /> : <GroupIcon />}
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Chat messages */}
        <Box flex="1" p={2} bgcolor="rgba(255, 255, 255, 0.8)" borderBottom="1px solid lightgray" overflow="auto">
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Avatar alt="User 1" src="/path-to-avatar1.jpg" />
            <Box ml={2} p={1} bgcolor="lightgray" borderRadius="10px">
              <Typography>Message 1 from user</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Box mr={2} p={1} bgcolor="rgba(44, 62, 80, 1)" color="white" borderRadius="10px">
              <Typography>Message 1 from me</Typography>
            </Box>
            <Avatar alt="My Avatar" src="/path-to-my-avatar.jpg" />
          </Box>
          {/* Add more messages here */}
        </Box>

        {/* Message input */}
        <Box p={2} bgcolor="whitesmoke" borderTop="1px solid lightgray" display="flex">
          <TextField fullWidth variant="outlined" placeholder="Type a message" />
          <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatApp;
