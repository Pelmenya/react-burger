import { useDispatch } from 'react-redux';
import { setError } from '../services/redux/slices/error-request';

export const useRequestError = () => {
  const dispatch = useDispatch();
  const setRequestError = (error: string) => dispatch(setError(error));
  return { setRequestError };
};
