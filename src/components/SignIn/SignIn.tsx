import React from 'react';

import Button from '@mui/material/Button';
import { authSignIn } from '@jsc/app/serverActions/auth';

type Props = { provider?: string } & React.ComponentPropsWithRef<typeof Button>;

export default function SignIn({ provider, ...props }: Props) {
  return (
    <form action={authSignIn}>
      <Button variant='contained' type='submit' size='small' {...props}>
        Sign In
      </Button>
    </form>
  );
}
