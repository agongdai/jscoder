import React from 'react';

import { faPersonToDoor } from '@fortawesome/pro-duotone-svg-icons';
import Button from '@mui/material/Button';
import { authSignOut } from '@jsc/app/serverActions/auth';
import AwesomeIcon from '@jsc/components/AwesomeIcon';

type Props = { provider?: string } & React.ComponentPropsWithRef<typeof Button>;

export default function SignOut({ provider, ...props }: Props) {
  return (
    <form action={authSignOut}>
      <Button
        startIcon={<AwesomeIcon icon={faPersonToDoor} />}
        type='submit'
        size='small'
        color='primary'
        variant='text'
        classes={{ root: 'px-0 shadow-none' }}
        {...props}
      >
        Sign Out
      </Button>
    </form>
  );
}
