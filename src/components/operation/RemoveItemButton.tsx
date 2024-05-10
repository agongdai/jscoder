'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { faTrashCan } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import { ApiResponse } from '@joy/types/api';
import { StyleVariant } from '@joy/types/common';
import { Button, Popover } from '@mui/material';

interface Props<T> {
  joyId: number;
  warningMessage?: string;
  apiCall: (joyId: number) => Promise<ApiResponse<T>>;
}

export default function RemoveItemButton<T>({
  joyId,
  warningMessage = 'You will lose the item permanently, sure?',
  apiCall,
}: Props<T>) {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onRemove = async () => {
    const res = await apiCall(joyId);
    handleClose();
    if (res.success) {
      enqueueSnackbar('The item has been removed successfully.', {
        variant: 'success',
      });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <AwesomeIcon
        icon={faTrashCan}
        tooltip={`Remove this item`}
        onClick={handleClick}
        size='lg'
        variant={StyleVariant.Danger}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: 'p-4 max-w-[30rem]' }}
      >
        <h6 className='mb-3'>{warningMessage}</h6>
        <Button onClick={onRemove} variant='contained' color='primary'>
          Remove
        </Button>
      </Popover>
    </div>
  );
}
