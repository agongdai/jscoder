'use client';
import React, { useCallback, useEffect } from 'react';

import { useJoyDispatch, useJoySelector } from '@joy/store';
import { setScrollTop } from '@joy/store/actions';
import { selectScrollTop } from '@joy/store/dom/selectors';

interface Props {
  children: React.ReactNode;
}

export default function ScrollTopHolder({ children }: Props) {
  const dispatch = useJoyDispatch();
  const holderRef = React.useRef<HTMLDivElement>(null);
  const scrollTop = useJoySelector(selectScrollTop);

  const setScrollTopEvent = useCallback(() => {
    if (holderRef.current) {
      dispatch(setScrollTop(holderRef.current.scrollTop));
    }
  }, [dispatch]);

  useEffect(() => {
    const holder = holderRef?.current;
    if (holder) {
      holder.addEventListener('scroll', setScrollTopEvent);

      return () => {
        if (holder) {
          holder.removeEventListener('scroll', setScrollTopEvent);
        }
      };
    }
  }, [setScrollTopEvent, holderRef, dispatch]);

  useEffect(() => {
    if (holderRef.current && holderRef.current.scrollTop !== scrollTop) {
      holderRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return (
    <div className='flex-1 px-4 joy-scrollbar lg:p-0 flex flex-col' ref={holderRef}>
      {children}
    </div>
  );
}
