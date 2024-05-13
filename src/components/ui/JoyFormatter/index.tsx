import React from 'react';

import JoyImage from '@joy/components/ui/JoyImage';
import { Value, ValueFormat } from '@joy/types/common';

import DateTime from './DateTime';
import Link from './Link';
import Number from './Number';

export default function MyexFormatter({
  value,
  format = ValueFormat.String,
}: {
  value: Value;
  format: ValueFormat;
}) {
  if (ValueFormat.Number === format) {
    return <Number value={value} />;
  }

  if (ValueFormat.Link === format) {
    return <Link href={String(value || '')} />;
  }

  if (ValueFormat.Image === format) {
    return <JoyImage src={String(value)} alt='' width={32} height={32} className='rounded-full' />;
  }

  if (ValueFormat.DateTime === format) {
    return <DateTime value={value} />;
  }

  return <div>{String(value)}</div>;
}
