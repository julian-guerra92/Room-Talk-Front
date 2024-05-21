import React from 'react';

interface MessageBubbleProps {
  message: string;
  userId: string;
}

export const ReceivedMessageBubble: React.FC<MessageBubbleProps> = ({ message, userId }) => (
  <div style={{ backgroundColor: 'lightgrey', color: 'black', padding: '5px', borderRadius: '10px', marginBottom: '10px' }}>
    <strong>{userId}</strong>: {message}
  </div>
);

export const SentMessageBubble: React.FC<MessageBubbleProps> = ({ message, userId }) => (
  <div style={{ backgroundColor: 'darkgrey', color: 'white', padding: '5px', borderRadius: '10px', marginBottom: '10px' }}>
    <strong>{userId}</strong>: {message}
  </div>
);