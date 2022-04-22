import React from 'react';
import { Box, Typography } from '@mui/material';
// import MoreHorizIcon from '@mui/icons/MoreHoriz';

const Header = () => {
  return (
    <Box>
      <Box>
        <Typography>Username</Typography>
        <Box />
        <Typography>Online status</Typography>
      </Box>
      {/* <MoreHorizIcon /> */}
    </Box>
  );
};

export default Header;
