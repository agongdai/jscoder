import React from 'react';

import { PropsWithChildren } from '@joy/types/common';

export function JoyPaper({ children, className }: PropsWithChildren) {
  return (
    <article className={`p-6 lg:p-4 bg-bg-light-light dark:bg-bg-dark-light shadow ${className}`}>
      {children}
    </article>
  );
}
