import React from 'react';

import { joyFetchColorVariables } from '@joy/app/serverActions/colorVariables';
import ColorVariablesList from '@joy/components/admin/ColorVariablesList';

export const revalidate = 10;

export default async function ColorVariablesPage() {
  const colorVariables = await joyFetchColorVariables();
  return (
    <div>
      <ColorVariablesList colorVariables={colorVariables} />
    </div>
  );
}
