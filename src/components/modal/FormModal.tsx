import React from 'react';

import { faXmark } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyLoadingButton from '@joy/components/ui/JoyLoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  children: React.ReactNode;
  formId: string;
  title: string;
  open: boolean;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function FormModal({ children, formId, title, open, onClose, isSubmitting }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' classes={{ paper: 'w-full' }}>
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        {title}
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <JoyLoadingButton formId={formId} loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
