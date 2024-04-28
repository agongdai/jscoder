import React from 'react';

import Button from '@mui/material/Button';

export default function ButtonVariants() {
  return (
    <div className='grid grid-cols-3 gap-8 items-center'>
      <Button variant='contained' size='large'>
        Contained
      </Button>
      <Button variant='contained' size='medium'>
        Contained
      </Button>
      <Button variant='contained' size='small'>
        Contained
      </Button>
      <Button variant='outlined' size='large'>
        Outlined
      </Button>
      <Button variant='outlined' size='medium'>
        Outlined
      </Button>
      <Button variant='outlined' size='small'>
        Outlined
      </Button>
      <Button variant='text' size='large'>
        Text
      </Button>
      <Button variant='text' size='medium'>
        Text
      </Button>
      <Button variant='text' size='small'>
        Text
      </Button>
    </div>
  );
}
