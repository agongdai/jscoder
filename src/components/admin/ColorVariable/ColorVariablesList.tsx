'use client';

import React from 'react';

import { joyRemoveCv } from '@joy/app/serverActions/colorVariable';
import RemoveItemButton from '@joy/components/operation/RemoveItemButton';
import UpdateCoinButton from '@joy/components/operation/UpdateItemButton';
import JoyTable from '@joy/components/ui/JoyTable';
import { ColumnData } from '@joy/components/ui/JoyTable/types';
import { setCvBeingUpdated } from '@joy/store/flags/actions';
import { ValueFormat } from '@joy/types/common';
import { ColorVariable } from '@prisma/client';

interface Props {
  colorVariables: ColorVariable[];
}

const columns: ColumnData<ColorVariable>[] = [
  {
    label: 'ID',
    dataKey: 'joyId',
    sortable: true,
    widthRem: 7,
  },
  {
    label: 'Name',
    dataKey: 'name',
    sortable: true,
    widthRem: 24,
  },
  {
    label: 'Is MUI color?',
    dataKey: 'muiColor',
    sortable: true,
    widthRem: 12,
  },
  {
    label: 'Category',
    dataKey: 'category',
    sortable: true,
    widthRem: 14,
  },
  {
    label: 'Key',
    dataKey: 'key',
    sortable: true,
    widthRem: 24,
  },
  {
    label: 'Doc URL',
    dataKey: 'docUrl',
    widthRem: 8,
    format: ValueFormat.Link,
  },
  {
    label: 'Description',
    dataKey: 'description',
  },
  {
    label: 'Actions',
    dataKey: 'joyId',
    renderComponent: (joyId, row) => (
      <div className='grid grid-cols-2 gap-1'>
        <RemoveItemButton<ColorVariable> joyId={Number(joyId)} apiCall={joyRemoveCv} />
        <UpdateCoinButton<ColorVariable>
          reduxAction={setCvBeingUpdated}
          item={row as ColorVariable}
        />
      </div>
    ),
    widthRem: 7,
  },
];
export default function ColorVariablesList({ colorVariables = [] }: Props) {
  return (
    <JoyTable<ColorVariable>
      data={colorVariables}
      columns={columns}
      defaultSortingField='joyId'
      defaultSortingDirection=''
    />
  );
}
