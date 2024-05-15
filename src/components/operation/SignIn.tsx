import React from 'react';

import { authSignIn } from '@joy/app/serverActions/auth';
import Button from '@mui/material/Button';

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
