'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { joyCreateCv } from '@joy/app/serverActions/colorVariable';
import ColorVariableForm from '@joy/components/admin/ColorVariable/ColorVariableForm';
import FormModal from '@joy/components/modal/FormModal';
import { useJoyDispatch, useJoySelector } from '@joy/store';
import { toggleCreateCvModal } from '@joy/store/flags/actions';
import { selectCreateCvModalOpen } from '@joy/store/flags/selectors';
import { IFormCv } from '@joy/types/cv';

const formId = 'create-cv-form';

export default function CreateCvModal() {
  const dispatch = useJoyDispatch();
  const createCvModalOpen = useJoySelector(selectCreateCvModalOpen);
  const router = useRouter();
  const onClose = () => dispatch(toggleCreateCvModal());

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormCv>({
    defaultValues: {
      name: '',
      category: '',
      key: '',
      description: '',
    },
  });

  const onSubmit = async (data: IFormCv) => {
    const res = await joyCreateCv(data);
    if (res.success) {
      reset();
      onClose();
      enqueueSnackbar('The color variable has been added successfully.', { variant: 'success' });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <FormModal
      open={Boolean(createCvModalOpen)}
      onClose={onClose}
      isSubmitting={isSubmitting}
      title='Create Color Variable'
      formId={formId}
    >
      <form id={formId} onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <ColorVariableForm control={control} errors={errors} />
      </form>
    </FormModal>
  );
}
