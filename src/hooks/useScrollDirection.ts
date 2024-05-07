'use client';

import usePrevious from '@joy/hooks/usePrevious';
import { useJoySelector } from '@joy/store';
import { selectScrollTop } from '@joy/store/dom/selectors';
import { Direction } from '@joy/types/window';

export default function useScrollDirection() {
  const scrollTop = useJoySelector(selectScrollTop);
  const previousScrollTop = usePrevious(scrollTop);

  return scrollTop && scrollTop > previousScrollTop ? Direction.Down : Direction.Up;
}
