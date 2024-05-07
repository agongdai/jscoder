import React from 'react';

import { faEnvelope, faHeart } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyLink from '@joy/components/ui/JoyLink';
import { StyleVariant } from '@joy/types/common';
import Divider from '@mui/material/Divider';

export default function Footer() {
  return (
    <footer className='w-full flex justify-between items-center my-4 p-4 bg-bg-primary-5 md:block mx-[auto] xl:mx-4 max-w-[148rem]'>
      <div className='flex items-center sm:block'>
        <div>
          &copy; {new Date().getFullYear()} Made with
          <AwesomeIcon
            icon={faHeart}
            variant={StyleVariant.Highlight}
            size='sm'
            className='mx-2'
          />{' '}
          by Shaojiang
        </div>
        <div className='flex items-center sm:my-1'>
          <Divider
            orientation='vertical'
            classes={{
              root: 'my-0 mx-3 h-3 border-primary-main dark:border-gray-lighter sm:hidden',
            }}
          />
          <JoyLink href='/privacy'>Privacy</JoyLink>
          <Divider
            orientation='vertical'
            classes={{ root: 'my-0 mx-3 h-3 border-primary-main dark:border-gray-lighter' }}
          />
          <JoyLink href='/terms'>Terms</JoyLink>
        </div>
      </div>
      <div className='flex items-center'>
        <JoyLink href='mailto:caishaojiang@gmail.com'>
          <AwesomeIcon icon={faEnvelope} className='mr-1' size='sm' /> caishaojiang@gmail.com
        </JoyLink>
      </div>
    </footer>
  );
}
