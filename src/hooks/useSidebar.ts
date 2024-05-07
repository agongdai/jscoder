import { useEffect, useState } from 'react';

import { SIDEBAR_WIDTH_DESKTOP, SIDEBAR_WIDTH_TABLET } from '@joy/config';
import useMuiMediaQuery from '@joy/hooks/useMuiMediaQuery';
import { useJoyDispatch } from '@joy/store';
import { setMobileSidebarOpen } from '@joy/store/actions';

export default function useSidebar() {
  const dispatch = useJoyDispatch();
  const { xlDown, mdDown } = useMuiMediaQuery();
  const [showMini, setShowMini] = useState(false);

  const toggleShowMini = () => setShowMini(!showMini);

  useEffect(() => {
    if (xlDown && !mdDown) {
      setShowMini(true);
    } else {
      setShowMini(false);
    }
  }, [mdDown, xlDown]);

  useEffect(() => {
    if (!mdDown) {
      dispatch(setMobileSidebarOpen(false));
    }
  }, [dispatch, mdDown]);

  return {
    sidebarWidth: showMini ? SIDEBAR_WIDTH_TABLET : SIDEBAR_WIDTH_DESKTOP,
    xlDown,
    mdDown,
    showMini,
    toggleShowMini,
  };
}
