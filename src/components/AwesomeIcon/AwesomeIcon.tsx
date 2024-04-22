import React from 'react';
import cx from 'classnames';

import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Zoom from '@mui/material/Zoom';
// import Tooltip from '@mui/material/Tooltip';
import { variant2Color } from '@jsc/theme/palette';
import { StyleVariant } from '@jsc/types/common';

interface Props {
  icon: IconProp;
  size?: SizeProp;
  className?: string;
  color?: string;
  contrast?: boolean;
  tooltip?: string;
  variant?: StyleVariant;
  onClick?: (_e: any) => void;
}

export default function AwesomeIcon({
  icon,
  size = 'xl',
  className,
  color,
  contrast = false,
  tooltip = '',
  variant = StyleVariant.Default,
  onClick,
}: Props) {
  const variantColor = variant2Color(variant);

  const iconNode = (
    <FontAwesomeIcon
      onClick={onClick}
      icon={icon}
      size={size}
      style={{ color: variantColor || color }}
      className={cx(`text-tertiary-main dark:text-tertiary-dark ${className}`, {
        'text-text-highlight dark:text-text-highlight': contrast,
        'cursor-pointer': onClick,
      })}
    />
  );
  
  return iconNode;

  // return tooltip ? (
  //   // <Tooltip arrow TransitionComponent={Zoom} title={tooltip}>
  //     {iconNode}
  //   // </Tooltip>
  // ) : (
  //   iconNode
  // );
}
