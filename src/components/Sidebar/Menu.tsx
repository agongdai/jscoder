'use client';

import React from 'react';
import cx from 'classnames';

import { faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyLink from '@joy/components/ui/JoyLink';
import JoyTooltip from '@joy/components/ui/JoyTooltip';
import useLocale from '@joy/hooks/useLocale';
import { useJoyDispatch } from '@joy/store';
import { setMobileSidebarOpen } from '@joy/store/dom/actions';
import { IMenu } from '@joy/types/common';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface Props {
  menu: IMenu;
  showMini: boolean;
}

export default function Menu({ menu, showMini }: Props) {
  const dispatch = useJoyDispatch();
  const { pathName } = useLocale();
  const selected =
    menu.href === '/'
      ? pathName === '/'
      : pathName.startsWith((menu.protected ? '/@me' : '') + menu.href);
  const [open, setOpen] = React.useState(false);
  const hasSubMenus = Number(menu.subMenus?.length) > 0;

  const hideMobileSidebar = () => {
    dispatch(setMobileSidebarOpen(false));
  };

  const handleClick = () => {
    if (hasSubMenus) {
      setOpen(!open);
    } else {
      hideMobileSidebar();
    }
  };

  return (
    <ListItem
      key={menu.title}
      disablePadding
      classes={{
        root: cx('block my-2', {
          'before:h-full before:z-10 before:block before:content-[" "] before:w-2 before:absolute before:left-0 before:top-0 before:rounded-e-[0.6rem] before:bg-primary-main':
            selected,
          'before:w-[0.6rem]': selected && showMini,
        }),
      }}
    >
      <ListItemButton
        color='secondary'
        selected={selected || hasSubMenus}
        onClick={handleClick}
        classes={{ root: cx('flex justify-between py-0', { 'pl-4': showMini, 'pl-5': !showMini }) }}
      >
        <JoyLink
          href={hasSubMenus ? '/' : (menu.protected ? `/@me` : '') + menu.href}
          className='hover:no-underline w-full py-2'
          disabled={hasSubMenus}
        >
          <JoyTooltip title={showMini ? menu.title : ''} placement='right'>
            <ListItemIcon>
              <AwesomeIcon icon={menu.icon} size='lg' contrast={selected} className='w-6 h-6' />
            </ListItemIcon>
          </JoyTooltip>
          <ListItemText
            primary={showMini ? '' : menu.title}
            classes={{ root: 'text-text-primary dark:text-text-primary-1' }}
          />
        </JoyLink>
        {hasSubMenus && !showMini && (
          <AwesomeIcon icon={open ? faChevronUp : faChevronDown} size='sm' />
        )}
      </ListItemButton>
      {hasSubMenus && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='ul' classes={{ root: 'py-0' }}>
            {(menu.subMenus || []).map((subMenu) => {
              const subMenuHref = (menu.protected ? '/@me' : '') + menu.href + subMenu.href;
              const exactSelect = subMenuHref === pathName;
              return (
                <ListItem key={subMenu.title} classes={{ root: 'block p-0' }}>
                  <ListItemButton
                    selected={exactSelect}
                    classes={{ root: cx('py-0 my-1', { 'pl-5': showMini }) }}
                    onClick={hideMobileSidebar}
                  >
                    <JoyLink href={subMenuHref} className='py-1 hover:no-underline'>
                      <JoyTooltip title={showMini ? subMenu.title : ''} placement='right'>
                        <ListItemIcon>
                          <AwesomeIcon
                            icon={subMenu.icon}
                            className='w-5 h-5'
                            contrast={exactSelect}
                          />
                        </ListItemIcon>
                      </JoyTooltip>
                      <ListItemText
                        primary={showMini ? '' : subMenu.title}
                        classes={{ root: 'text-text-primary dark:text-text-primary-1' }}
                      />
                    </JoyLink>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
}
