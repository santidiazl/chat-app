import React from 'react';
import { Box, Badge, Avatar } from '@mui/material';

type Props = {
  sidebar?: boolean;
  username?: string;
  photoUrl?: string;
  online?: boolean;
};

const UserAvatar = ({ sidebar, username, photoUrl, online }: Props) => {
  return (
    <Box>
      <Badge
        variant="dot"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        overlap="circular"
        sx={{
          height: 13,
          width: 13,
          borderRadius: '50%',
          border: '2px solid white',
          backgroundColor: !online ? '#D0DAE9' : '#1CED84',
        }}
      >
        <Avatar
          alt={username}
          src={photoUrl}
          sx={{
            height: 44,
            width: 44,
          }}
        />
      </Badge>
    </Box>
  );
};

export default UserAvatar;
