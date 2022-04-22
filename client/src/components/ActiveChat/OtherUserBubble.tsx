import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const OtherUserBubble = () => {
  return (
    <Box>
      <Avatar />
      <Box>
        <Typography>Other User(s)</Typography>
        <Box>
          <Typography>message</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
