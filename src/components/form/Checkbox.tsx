import React from 'react';

import { CheckboxProps, default as MuiCheckbox } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = CheckboxProps & {
  label: React.ReactNode | string;
};

export default function Checkbox({ label, ...props }: Props) {
  return (
    <FormControlLabel
      control={<MuiCheckbox checked={Boolean(props.value)} {...props} />}
      label={label}
    />
  );
}
