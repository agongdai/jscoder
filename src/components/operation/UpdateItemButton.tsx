'use client';

import React from 'react';

import { faPencil } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import { useJoyDispatch } from '@joy/store';
import { StyleVariant } from '@joy/types/common';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface Props<T> {
  item: T;
  reduxAction: ActionCreatorWithPayload<T>;
}

export default function UpdateCoinButton<T>({ item, reduxAction }: Props<T>) {
  const dispatch = useJoyDispatch();
  const onUpdate = () => dispatch(reduxAction(item));

  return (
    <AwesomeIcon
      icon={faPencil}
      tooltip={`Update`}
      onClick={onUpdate}
      size='lg'
      variant={StyleVariant.Info}
    />
  );
}
