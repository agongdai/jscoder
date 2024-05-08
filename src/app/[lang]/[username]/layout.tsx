import React from 'react';

import { auth } from '@joy/auth';
import ProtectedAreaWarning from '@joy/components/ProtectedAreaWarning';
import { JoyPageWrapper } from '@joy/components/ui/JoyStyled';
import { ParamsWithChildren } from '@joy/types/i18n';

export default async function ProtectedLayout({ children }: ParamsWithChildren) {
  const session = await auth();
  return <JoyPageWrapper>{session?.user ? children : <ProtectedAreaWarning />}</JoyPageWrapper>;
}
