import React from 'react';

import { default as MuiSelect, SelectProps } from '@mui/material/Select';

export default function Select(props: SelectProps) {
  return (
    <MuiSelect
      {...props}
      displayEmpty
      fullWidth
      variant='filled'
      classes={{ select: 'py-[1.7rem] flex' }}
    />
  );
}
