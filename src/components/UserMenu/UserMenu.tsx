'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import SignIn from '@joy/components/SignIn';
import SignOut from '@joy/components/SignOut';
import JoyTooltip from '@joy/components/ui/JoyTooltip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function UserMenu() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!session?.user) {
    return <SignIn />;
  }

  const user = session.user;

  return (
    <div>
      <JoyTooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt={user?.name || 'You'}
            src={user?.image || undefined}
          >
            {(user?.name || 'Y').slice(0, 1).toUpperCase()}
          </Avatar>
        </IconButton>
      </JoyTooltip>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>{user?.name || 'Anonymous'}</MenuItem>
        <MenuItem onClick={handleClose}>{user?.email}</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <SignOut />
        </MenuItem>
      </Menu>
    </div>
  );
}
