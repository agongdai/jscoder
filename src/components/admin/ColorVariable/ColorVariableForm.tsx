'use client';

import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import Checkbox from '@joy/components/form/Checkbox';
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
      <div className='my-4'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.name}
              helperText={errors.name?.message}
              label='Name'
              placeholder='Name of the color variable'
              {...field}
              ref={null}
              autoFocus
            />
          )}
          rules={{
            required: 'Please provide a name.',
          }}
          name='name'
          control={control}
        />
      </div>

      <div className='mb-4 grid grid-cols-4 gap-4 items-center'>
        <div className='col-span-3'>
          <Controller
            render={({ field }) => (
              <Select
                rhfError={errors.category}
                options={[
                  { label: 'MUI Variant', value: CvCategory.MUI_VARIANT },
                  { label: 'MUI Palette', value: CvCategory.MUI_PALETTE },
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
        <div className='pt-6'>
          <Controller
            render={({ field }) => <Checkbox label={'MUI Color'} {...field} ref={null} />}
            name='muiColor'
            control={control}
          />
        </div>
      </div>

      <div className='mb-4'>
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

      <div className='mb-4'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.docUrl}
              helperText={errors.docUrl?.message}
              label='Document URL'
              placeholder='document URL'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a document url.',
          }}
          name='docUrl'
          control={control}
        />
      </div>

      <div className='mb-4'>
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
