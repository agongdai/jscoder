import React from 'react';

import { faGlobePointer } from '@fortawesome/pro-solid-svg-icons';
import AwesomeIcon from '@joy/components/AwesomeIcon';
import JoyLink from '@joy/components/ui/JoyLink';

export default function Link({ href }: { href: string }) {
  return (
    <JoyLink href={href}>
      <AwesomeIcon icon={faGlobePointer} size='lg' tooltip={href} />
    </JoyLink>
  );
}
