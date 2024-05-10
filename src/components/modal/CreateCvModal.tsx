'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { joyCreateCv } from '@joy/app/serverActions/colorVariable';
import ColorVariableForm from '@joy/components/admin/ColorVariable/ColorVariableForm';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyLoadingButton from '@joy/components/ui/JoyLoadingButton';
import { useJoyDispatch, useJoySelector } from '@joy/store';
import { toggleCreateCvModal } from '@joy/store/flags/actions';
import { selectCreateCvModalOpen } from '@joy/store/flags/selectors';
import { IFormNewCv } from '@joy/types/cv';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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
  } = useForm<IFormNewCv>({
    defaultValues: {
      name: '',
      category: '',
      key: '',
      description: '',
    },
  });

  const onSubmit = async (data: IFormNewCv) => {
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
    <Dialog
      open={Boolean(createCvModalOpen)}
      onClose={onClose}
      maxWidth='sm'
      classes={{ paper: 'w-full' }}
    >
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        Create Coin
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>
        <form id='create-coin-form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <ColorVariableForm control={control} errors={errors} />
        </form>
      </DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <JoyLoadingButton formId='create-coin-form' loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
