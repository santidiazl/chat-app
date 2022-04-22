import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
// import { MoreHorizIcon } from '@mui/icons-material/';

import { RootState } from '../store';
import UserAvatar from './UserAvatar';

const CurrentUser = () => {
  const photoUrl: string | null = useSelector(
    (state: RootState) => state.user?.photoUrl,
  );

  return (
    <Box
      sx={{
        height: 44,
        marginTop: 23,
        marginLeft: 6,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <UserAvatar photoUrl={photoUrl || ''} online />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            letterSpacing: -0.23,
            fontSize: 16,
            fontWeight: 'bold',
            marginLefT: 17,
          }}
        />
        {/* <MoreHorizIcon
          sx={{
            color: '#95A7C4',
            marginRight: 24,
            opacity: 0.5,
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default CurrentUser;
