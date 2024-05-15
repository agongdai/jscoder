'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { joyUpdateCv } from '@joy/app/serverActions/colorVariable';
import ColorVariableForm from '@joy/components/admin/ColorVariable/ColorVariableForm';
import FormModal from '@joy/components/modal/FormModal';
import { useJoyDispatch, useJoySelector } from '@joy/store';
import { setCvBeingUpdated } from '@joy/store/flags/actions';
import { selectCvBeingUpdated } from '@joy/store/flags/selectors';
import { IFormCv } from '@joy/types/cv';

const formId = 'update-cv-form';

export default function UpdateCoinModal() {
  const dispatch = useJoyDispatch();
  const cvToUpdate = useJoySelector(selectCvBeingUpdated);
  const router = useRouter();
  const onClose = () => dispatch(setCvBeingUpdated(null));

  const defaultValues = useMemo(
    () => ({
      name: cvToUpdate?.name || '',
      category: cvToUpdate?.category || '',
      key: cvToUpdate?.key || '',
      description: cvToUpdate?.description || '',
      docUrl: cvToUpdate?.docUrl || '',
      muiColor: cvToUpdate?.muiColor || false,
    }),
    [cvToUpdate],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormCv>({
    defaultValues,
  });

  useEffect(() => {
    if (cvToUpdate) {
      reset({ ...defaultValues });
    }
  }, [cvToUpdate, defaultValues, reset]);

  const onSubmit = async (data: IFormCv) => {
    if (!cvToUpdate) return;

    const res = await joyUpdateCv({
      ...data,
      description: data?.description || '',
      joyId: cvToUpdate.joyId,
    });

    if (res.success) {
      onClose();
      enqueueSnackbar(`The coin ${cvToUpdate.name} has been updated successfully.`, {
        variant: 'success',
      });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <FormModal
      open={Boolean(cvToUpdate)}
      onClose={onClose}
      isSubmitting={isSubmitting}
      title={`Update Color Variable ${cvToUpdate?.name || ''}`}
      formId={formId}
    >
      <form id={formId} onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <ColorVariableForm control={control} errors={errors} update />
      </form>
    </FormModal>
  );
}
