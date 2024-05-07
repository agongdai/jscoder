'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { faLanguage } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyDropdown from '@joy/components/ui/JoyDropdown';
import useLocale from '@joy/hooks/useLocale';
import { defaultLocale, languages } from '@joy/i18n/config';
import { IconButton } from '@mui/material';

export default function LangSwitch() {
  const { locale, pathName } = useLocale();
  const router = useRouter();

  const setLocale = (locale: string | number) => {
    router.push(`/${locale}${pathName}`);
  };

  return (
    <JoyDropdown
      tooltip='Switch language'
      menus={languages.map((lang) => ({ label: lang.name, value: lang.code }))}
      activeValue={locale || defaultLocale}
      onChange={setLocale}
    >
      <IconButton>
        <AwesomeIcon icon={faLanguage} size='sm' />
      </IconButton>
    </JoyDropdown>
  );
}
