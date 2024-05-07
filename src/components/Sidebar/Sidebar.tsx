'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';

import { faChevronLeft, faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyImage from '@joy/components/ui/JoyImage';
import JoyLink from '@joy/components/ui/JoyLink';
import JoyTooltip from '@joy/components/ui/JoyTooltip';
import useSidebar from '@joy/hooks/useSidebar';
import { useJoyDispatch, useJoySelector } from '@joy/store';
import { setMobileSidebarOpen } from '@joy/store/actions';
import { selectMobileSidebarOpen } from '@joy/store/dom/selectors';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';

import Menu from './Menu';
import menus from './menus';

export default function Sidebar() {
  const dispatch = useJoyDispatch();
  const { data: session } = useSession();
  const authed = !!session?.user;
  const showMobileSidebar = useJoySelector(selectMobileSidebarOpen);
  const { sidebarWidth, toggleShowMini, showMini, xlDown, mdDown } = useSidebar();
  const toggleSidebar = () => {
    dispatch(setMobileSidebarOpen(!showMobileSidebar));
  };

  const $list = (
    <aside
      style={{ width: `${sidebarWidth}rem` }}
      className='overflow-hidden transition-all bg-white dark:bg-bg-dark-light h-full shadow-2xl'
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <Toolbar classes={{ root: cx('flex justify-between', { 'px-0': showMini }) }}>
            <JoyLink href='/'>
              <JoyImage src='/jscoder.png' alt='Joy Trading' width={48} height={48} />
            </JoyLink>
            {!xlDown && (
              <JoyTooltip title='Toggle Mini Sidebar' placement={showMini ? 'right' : 'bottom'}>
                <div onClick={toggleShowMini} className='cursor-pointer'>
                  <AwesomeIcon icon={showMini ? faChevronRight : faChevronLeft} size='sm' />
                </div>
              </JoyTooltip>
            )}
          </Toolbar>
          <Divider classes={{ root: '!m-0' }} />
          <List>
            {menus
              .filter((m) => authed || !m.protected)
              .map((menu) => (
                <Menu menu={menu} key={menu.title} showMini={showMini} />
              ))}
          </List>
        </div>
        <div className='p-8'>
          <JoyImage src='/jscoder.png' alt='Joy Trading' width={500} height={500} />
        </div>
      </div>
    </aside>
  );

  if (showMobileSidebar || mdDown) {
    return (
      <Drawer
        anchor='left'
        open={showMobileSidebar}
        onClose={toggleSidebar}
        keepMounted
        classes={{ paper: 'dark:bg-bg-dark-light' }}
      >
        {$list}
      </Drawer>
    );
  }

  return $list;
}
