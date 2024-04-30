import React from 'react';

import { PropsWithChildren } from '@joy/types/common';

export function JoyPageWrapper({ children, className = '' }: PropsWithChildren) {
  return (
    <div className={`pt-4 px-4 mx-[auto] max-w-[150rem] flex-1 w-full md:p-0 ${className}`}>
      {children}
    </div>
  );
}
