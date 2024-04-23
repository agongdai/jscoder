'use client';
import React from 'react';
import { useJscDispatch, useJscSelector } from '@jsc/store';
import { selectScrollTop } from '@jsc/store/dom/selectors';
import { setScrollTop } from '@jsc/store/dom/actions';

export default function UseClientDummy() {
  const dispatch = useJscDispatch();
  const scrollTop = useJscSelector(selectScrollTop);
  return (
    <div onClick={() => dispatch(setScrollTop(scrollTop + 1))}>
      UseClientDummy scrollTop: {scrollTop}
    </div>
  )
}
