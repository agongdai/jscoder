'use client';

import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import Select from '@joy/components/form/Select';
import TextField from '@joy/components/form/TextField';
import { CvCategory, IFormCv } from '@joy/types/cv';

interface Props {
  control: Control<IFormCv>;
  errors: FieldErrors<IFormCv>;
  update?: boolean;
}

export default function CreateCoinForm({ control, errors, update }: Props) {
  return (
    <div className='w-full'>
      <div className='my-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.name}
              helperText={errors.name?.message}
              label='Name'
              placeholder='Name of the color variable'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a name.',
          }}
          name='name'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <Select
              rhfError={errors.category}
              options={[
                { label: 'System', value: CvCategory.SYSTEM },
                { label: 'Reference', value: CvCategory.REFERENCE },
                { label: 'Surface', value: CvCategory.SURFACE },
              ]}
              label='Category'
              placeholder='Category like "system"'
              field={field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a category.',
          }}
          name='category'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.key}
              helperText={errors.key?.message}
              label='Key'
              placeholder='camel case key like "primaryMain"'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a key.',
          }}
          name='key'
          disabled={update}
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              multiline
              error={!!errors.description}
              helperText={errors.description?.message}
              label='Description'
              placeholder='Explain how and where this color variable will be used.'
              {...field}
              ref={null}
            />
          )}
          name='description'
          control={control}
        />
      </div>
    </div>
  );
}
