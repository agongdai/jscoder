import React from 'react';

import { faSave } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import { LoadingButton } from '@mui/lab';

interface Props {
  label?: string;
  loading: boolean;
  formId?: string;
}

function JoyLoadingButton({ label = 'Save', loading, formId }: Props) {
  return (
    <LoadingButton
      loadingPosition='start'
      variant='contained'
      color='primary'
      type='submit'
      loading={loading}
      form={formId}
      startIcon={<AwesomeIcon icon={faSave} />}
    >
      {label}
    </LoadingButton>
  );
}

export default React.memo(JoyLoadingButton);
