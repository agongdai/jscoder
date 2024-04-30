import React from 'react';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@joy/auth';
import ProtectedAreaWarning from '@joy/components/ProtectedAreaWarning';
import { JoyPageWrapper, JoyPaper } from '@joy/components/ui/JoyStyled';

import RegisterUserForm from './form';

export default async function RegisterUser() {
  const session = await auth();
  return (
    <JoyPageWrapper>
      <h1>Register User</h1>
      <JoyPaper className='max-w-[80rem] my-6'>
        <SessionProvider session={session}>
          {session?.user ? <RegisterUserForm /> : <ProtectedAreaWarning />}
        </SessionProvider>
      </JoyPaper>
    </JoyPageWrapper>
  );
}
