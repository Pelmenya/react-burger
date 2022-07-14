import { useCallback } from 'react';
import { setActiveLink } from '../services/redux/slices/header-nav/header-nav';
import { useAppDispatch } from './use-app-dispatch';

export const useNavHeader = () => {
  const dispatch = useAppDispatch();
  const setActive = useCallback((navItem: string) => dispatch(setActiveLink(navItem)), [
    dispatch,
  ]);
  return { setActive };
};
