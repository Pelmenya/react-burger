import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../services/redux/slices/header-nav';

export const useNavHeader = () => {
  const dispatch = useDispatch();
  const setActive = useCallback((navItem: string) => dispatch(setActiveLink(navItem)), [
    dispatch,
  ]);
  return { setActive };
};
