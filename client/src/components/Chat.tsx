import React from 'react';
import { Box } from '@mui/material';

import UserAvatar from './UserAvatar';
import ChatContent from './ChatContent';
import UnreadBadge from './UnreadBadge';

const Chat = () => {
  return (
    <Box>
      <UserAvatar />
      <ChatContent />
      <UnreadBadge />
    </Box>
  );
};

export default Chat;
