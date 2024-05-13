import React from 'react';
import { FieldError } from 'react-hook-form';

import { Option } from '@joy/types/common';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { SelectProps } from '@mui/material/Select';

import JoySelect from './JoySelect';

type Props = SelectProps & {
  options: Option[];
  rhfError: FieldError | undefined;
  field: any;
};

export default function Select({ options, rhfError, field, ...props }: Props) {
  return (
    <FormControl variant='filled' fullWidth>
      <InputLabel error={!!rhfError} id='category-select-label'>
        Category
      </InputLabel>
      <JoySelect
        labelId='category-select-label'
        id='category-select'
        label='Product Category'
        error={!!rhfError}
        {...field}
        ref={null}
      >
        <MenuItem disabled value=''>
          <em>Select ...</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </JoySelect>
      {rhfError && <FormHelperText error>{String(rhfError?.message)}</FormHelperText>}
    </FormControl>
  );
}
