import React from 'react';

import JoyFormatter from '@joy/components/ui/JoyFormatter';
import { ColumnData } from '@joy/components/ui/JoyTable/types';
import { Value, ValueFormat } from '@joy/types/common';

export default function CellRenderer<T>({ column, item }: { column: ColumnData<T>; item: T }) {
  if (column.renderComponent) {
    return column.renderComponent(item[column.dataKey], item);
  }

  return (
    <JoyFormatter
      value={item[column.dataKey] as Value}
      format={column.format || ValueFormat.String}
    />
  );
}
