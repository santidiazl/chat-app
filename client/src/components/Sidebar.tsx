import React from 'react';
import { Box, Typography } from '@mui/material';

import Search from './Search';
import Chat from './Chat';
import CurrentUser from './CurrentUser';

const Sidebar = () => {
  return (
    <Box>
      <CurrentUser />
      <Typography>Chats</Typography>
    </Box>
  );
};

export default Sidebar;
