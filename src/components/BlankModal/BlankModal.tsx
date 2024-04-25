'use client';

import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export default function BlankModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen(true)} className='cursor-pointer'>
        Open Dialog
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <div>Blank Modal</div>
          <div>This is the content of the Modal.</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
