'use client';

import React from 'react';

import { joyRemoveCv } from '@joy/app/serverActions/colorVariables';
import RemoveItemButton from '@joy/components/admin/RemoveItemButton';
import JoyTable from '@joy/components/ui/JoyTable';
import { ColumnData } from '@joy/components/ui/JoyTable/types';
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
    widthRem: 20,
  },
  {
    label: 'Category',
    dataKey: 'category',
    sortable: true,
    widthRem: 10,
  },
  {
    label: 'Key',
    dataKey: 'key',
    sortable: true,
  },
  {
    label: 'Description',
    dataKey: 'description',
  },
  {
    label: 'Actions',
    dataKey: 'joyId',
    renderComponent: (joyId) => <RemoveItemButton joyId={Number(joyId)} apiCall={joyRemoveCv} />,
    widthRem: 10,
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
