'use client';
import React from 'react';

import JoyLink from '@joy/components/ui/JoyLink';
import JoyTooltip from '@joy/components/ui/JoyTooltip';
import { Option } from '@joy/types/common';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  menus: Option[];
  activeValue?: Option['value'];
  onChange?: (value: Option['value']) => void;
  children: React.ReactElement;
  tooltip?: string;
}

export default function JoyDropdown({
  tooltip = 'Click to show the menus',
  menus,
  activeValue = '',
  onChange,
  children,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <JoyTooltip title={tooltip} onClick={handleClick}>
        {children}
      </JoyTooltip>
      <Menu
        anchorEl={anchorEl}
        id='menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menus.map((menu) => (
          <MenuItem
            key={menu.value}
            selected={activeValue === menu.value}
            onClick={() => onChange && onChange(menu.value)}
          >
            {menu.href ? <JoyLink href={menu.href}>{menu.label}</JoyLink> : menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
