import React from 'react';

import { joyFetchColorVariables } from '@joy/app/serverActions/colorVariables';
import ColorVariablesList from '@joy/components/admin/ColorVariables';
import CreateCvButton from '@joy/components/admin/ColorVariables/CreateCvButton';
import CreateCvModal from '@joy/components/modals/CreateCvModal';

export const revalidate = 10;

export default async function ColorVariablesPage() {
  const colorVariables = await joyFetchColorVariables();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1>Color Variables</h1>
        <CreateCvButton />
      </div>
      <ColorVariablesList colorVariables={colorVariables} />
      <CreateCvModal />
    </div>
  );
}
