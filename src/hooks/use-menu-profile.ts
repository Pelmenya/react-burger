import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveMenuProfileItem } from '../services/redux/slices/menu-profile';

export const useMenuProfile = () => {
  const dispatch = useDispatch();
  const setActiveMenuProfile = useCallback((navItem: string) => dispatch(setActiveMenuProfileItem(navItem)), [
    dispatch,
  ]);
  return { setActiveMenuProfile };
};
