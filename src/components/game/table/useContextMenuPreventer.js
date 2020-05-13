import { useEffect } from 'react';

export const useContextMenuPreventer = () => {
  useEffect(() => {
    const preventContextMenu = e => {
      e.preventDefault();
      return false;
    };

    document.body.addEventListener('contextmenu', e => preventContextMenu(e));
    return () => {
      document.body.removeEventListener('contextmenu', e => preventContextMenu(e));
    };
  }, []);
};
