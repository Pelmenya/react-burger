import { setError } from '../services/redux/slices/error-request/error-request';
import { useAppDispatch } from './use-app-dispatch';

export const useRequestError = () => {
  const dispatch = useAppDispatch();
  const setRequestError = (error: string) => dispatch(setError(error));
  return { setRequestError };
};
