'use client';
import React, { useEffect } from 'react';

import { useJoyDispatch, useJoySelector } from '@joy/store';
import { setPrimaryColor } from '@joy/store/theming/actions';
import { selectPrimaryColor } from '@joy/store/theming/selectors';
import Button from '@mui/material/Button';

export default function Theming() {
  const dispatch = useJoyDispatch();
  const color = useJoySelector(selectPrimaryColor);

  return (
    <div>
      <input
        type='text'
        onChange={(e) => dispatch(setPrimaryColor(e.target.value))}
        value={color}
      />
      <Button color='primary' variant='contained' size='large'>
        Primary Color
      </Button>
    </div>
  );
}
