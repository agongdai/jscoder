'use client';
import React from 'react';

import { JoyPageWrapper, JoyPaper } from '@joy/components/ui/JoyStyled';

import TermsMd from './terms.mdx';

export default function TermsPage() {
  return (
    <JoyPageWrapper>
      <JoyPaper className='prose dark:prose-invert'>
        <TermsMd />
      </JoyPaper>
    </JoyPageWrapper>
  );
}
