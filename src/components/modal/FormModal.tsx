import React from 'react';

import { faXmark } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyLoadingButton from '@joy/components/ui/JoyLoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

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
        <div className='flex'>
          <IconButton onClick={onClose}>
            <AwesomeIcon icon={faXmark} size='sm' tooltip='Cancel' className='w-5 h-5' />
          </IconButton>
        </div>
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
