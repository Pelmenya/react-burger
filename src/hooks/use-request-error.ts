import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../services/redux/slices/error-request';

export const useRequestError = () => {
  const dispatch = useDispatch();
  const setRequestError = useCallback((error: string) => dispatch(setError(error)), [
    dispatch,
  ]);
  return { setRequestError };
};
