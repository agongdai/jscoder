'use client';

import React from 'react';

import { useJoyDispatch } from '@joy/store';
import { toggleCreateCvModal } from '@joy/store/flags/actions';
import Button from '@mui/material/Button';

export default function CreateCvButton() {
  const dispatch = useJoyDispatch();
  const onCreate = () => dispatch(toggleCreateCvModal());

  return (
    <Button variant='contained' color='primary' onClick={onCreate}>
      Add New Color Variable
    </Button>
  );
}
