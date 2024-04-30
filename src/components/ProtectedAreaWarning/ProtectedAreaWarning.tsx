import React from 'react';

import SignIn from '@joy/components/SignIn';
import Alert from '@mui/material/Alert';

export default function ProtectedAreaWarning({ adminOnly = false }: { adminOnly?: boolean }) {
  return (
    <Alert severity='error' classes={{ root: 'py-8 px-6 my-20 max-w-[48rem] mx-auto' }}>
      <h5 className='mb-4'>
        {adminOnly
          ? 'You need to sign in as an admin to visit this page'
          : 'Yor are visiting protected content. Please sign in first.'}
      </h5>
      <SignIn size='medium' />
    </Alert>
  );
}
