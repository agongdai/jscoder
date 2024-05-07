'use client';

import React, { useEffect, useState } from 'react';
import { default as NextImage } from 'next/image';
import cx from 'classnames';

import Skeleton from '@mui/material/Skeleton';

interface JoyImageProps {
  className?: string;
  placeholderSrc?: string;
  background?: boolean;
  children?: React.ReactNode;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function JoyImage({
  className = '',
  src,
  placeholderSrc,
  background,
  children = null,
  alt = '',
  width = 0,
  height = 0,
  onClick,
}: JoyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      if (!placeholderSrc || placeholderLoaded) {
        const image = new Image();
        image.onload = () => setLoaded(true);
        image.src = src;
      }
    }
  }, [placeholderLoaded, placeholderSrc, src]);

  useEffect(() => {
    if (placeholderSrc) {
      const image = new Image();
      image.onload = () => setPlaceholderLoaded(true);
      image.src = placeholderSrc;
    }
  }, [placeholderSrc]);

  const displayedImageURL = placeholderSrc ? (placeholderLoaded ? src : placeholderSrc) : src;

  if (background) {
    const classes = cx('relative bg-no-repeat bg-center shadow-lg', className);
    const w = width || 'auto';
    return loaded ? (
      <div
        onClick={onClick}
        className={classes}
        style={{
          height,
          width: w,
          backgroundImage: `url(${displayedImageURL})`,
          backgroundSize: 'cover',
        }}
      >
        {children}
      </div>
    ) : (
      <div className={classes} style={{ height, width: w }}>
        <Skeleton classes={{ root: 'rounded-3xl' }} variant='rounded' height={height} />
        {children}
      </div>
    );
  }

  if (!loaded) {
    return (
      <Skeleton
        variant='rounded'
        height={height}
        width={width || '100%'}
        classes={{ root: 'overflow-hidden max-w-full max-h-[40rem]' }}
      />
    );
  }

  if (width && height) {
    const smallDimension = width <= 40 && height <= 40;
    return (
      <NextImage
        onClick={onClick}
        src={displayedImageURL}
        alt={alt}
        width={width}
        height={height}
        className={`${className}`}
        placeholder={smallDimension ? undefined : 'blur'}
        blurDataURL={
          smallDimension
            ? undefined
            : 'data:image/png;base64,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'
        }
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displayedImageURL}
      alt={alt}
      style={{ height: height || 'auto' }}
      className={cx('inline-block', className)}
      onClick={onClick}
    />
  );
}
