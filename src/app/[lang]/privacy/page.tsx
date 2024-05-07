'use client';
import React from 'react';

import { JoyPageWrapper, JoyPaper } from '@joy/components/ui/JoyStyled';

import PrivacyMd from './privacy.mdx';

export default function PrivacyPage() {
  return (
    <JoyPageWrapper>
      <JoyPaper className='prose dark:prose-invert'>
        <PrivacyMd />
      </JoyPaper>
    </JoyPageWrapper>
  );
}
