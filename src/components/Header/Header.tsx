'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import cx from 'classnames';

import { faBars } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import LangSwitch from '@joy/components/LangSwitch';
import ThemeSwitch from '@joy/components/ThemeSwitch';
import JoyLink from '@joy/components/ui/JoyLink';
import UserMenu from '@joy/components/UserMenu';
import useScrollDirection from '@joy/hooks/useScrollDirection';
import useSidebar from '@joy/hooks/useSidebar';
import { useJoyDispatch, useJoySelector } from '@joy/store';
import { setMobileSidebarOpen } from '@joy/store/actions';
import { selectScrollTop } from '@joy/store/selectors';
import { JoyTheme } from '@joy/theme';
import { Direction } from '@joy/types/window';
import AppBar from '@mui/material/AppBar';

export default function Header() {
  const dispatch = useJoyDispatch();
  const { mdDown } = useSidebar();
  const scrollTop = useJoySelector(selectScrollTop);
  const scrollingDirection = useScrollDirection();
  const { theme } = useTheme();

  const scrolled = scrollTop > 0;

  const showMobileSidebar = () => {
    dispatch(setMobileSidebarOpen(true));
  };

  return (
    <AppBar
      position='sticky'
      classes={{
        root: cx('mx-[auto] max-w-[150rem] transition-all', {
          '-translate-y-16': scrolled && scrollingDirection === Direction.Down,
        }),
      }}
    >
      <div
        className={cx('transition-all flex justify-between items-center px-4 py-2 sm:px-2', {
          'bg-bg-light-light': theme === JoyTheme.Light && scrolled,
          'bg-bg-dark-light': theme === JoyTheme.Dark && scrolled,
          'shadow-lg mx-4 sm:mx-0': scrolled,
        })}
      >
        <div className='flex-1 text-lg font-bold'>
          {mdDown && <AwesomeIcon icon={faBars} onClick={showMobileSidebar} size='sm' />}
          <JoyLink href='/' className='!text-primary-main md:ml-4 sm:ml-2'>
            JsCoder
          </JoyLink>
          <span className='ml-2 text-xs'>by Shaojiang</span>
        </div>
        <ul className='flex items-center'>
          <li className='ml-1'>
            <LangSwitch />
          </li>
          <li className='ml-1'>
            <ThemeSwitch />
          </li>
          <li className='ml-1'>
            <UserMenu />
          </li>
        </ul>
      </div>
    </AppBar>
  );
}
