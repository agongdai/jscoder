'use client';
import React from 'react';

import { useJscDispatch, useJscSelector } from '@joy/store';
import { setScrollTop } from '@joy/store/dom/actions';
import { selectScrollTop } from '@joy/store/dom/selectors';

export default function ClientDummy() {
  const dispatch = useJscDispatch();
  const scrollTop = useJscSelector(selectScrollTop);
  return (
    <div onClick={() => dispatch(setScrollTop(scrollTop + 1))}>
      UseClientDummy scrollTop: {scrollTop}
    </div>
  );
}
