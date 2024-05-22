import React from 'react';

interface MessageBubbleProps {
  message: string;
  userId: string;
  userName: string;
}

export const ReceivedMessageBubble: React.FC<MessageBubbleProps> = ({ message, userId, userName }) => (
  <div style={{ backgroundColor: 'lightgrey', color: 'black', padding: '5px', borderRadius: '10px', marginBottom: '10px' }}>
    <strong>{userName}</strong>: {message}
  </div>
);

export const SentMessageBubble: React.FC<MessageBubbleProps> = ({ message, userId, userName }) => (
  <div style={{ backgroundColor: 'darkgrey', color: 'white', padding: '5px', borderRadius: '10px', marginBottom: '10px' }}>
    <strong>{userName}</strong>: {message}
  </div>
);
