import React from 'react';
import dayjs from 'dayjs';

import { Value } from '@joy/types/common';

export default function DateTime({ value }: { value: Value }) {
  const dateStr = String(value);

  return <div className='flex'>{dayjs(dateStr).format('YYYY-MM-DD')}</div>;
}
