import { useCallback } from 'react';
import { setActiveMenuProfileItem } from '../services/redux/slices/menu-profile/menu-profile';
import { useAppDispatch } from './use-app-dispatch';

export const useMenuProfile = () => {
  const dispatch = useAppDispatch();
  const setActiveMenuProfile = useCallback((navItem: string) => dispatch(setActiveMenuProfileItem(navItem)), [
    dispatch,
  ]);
  return { setActiveMenuProfile };
};
