import React from 'react';

import { joyFetchColorVariables } from '@joy/app/serverActions/colorVariable';
import ColorVariablesList from '@joy/components/admin/ColorVariable';
import CreateCvButton from '@joy/components/admin/ColorVariable/CreateCvButton';
import CreateCvModal from '@joy/components/modal/CreateCvModal';
import UpdateCvModal from '@joy/components/modal/UpdateCvModal';

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
      <UpdateCvModal />
    </div>
  );
}
