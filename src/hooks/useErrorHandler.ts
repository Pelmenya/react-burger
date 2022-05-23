import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from '../services/redux/selectors/auth';
import { getProfileState } from '../services/redux/selectors/profile';
import { clearAuthError, postToken } from '../services/redux/slices/auth';
import { clearProfileError } from '../services/redux/slices/profile';
import { DispatchType } from '../utils/types/dispatch-type';
import { useRequestError } from './useRequestError';

export const useErrorHandler = () => {
  const dispatch = useDispatch<DispatchType>();
	const refreshToken = localStorage.getItem('refreshToken')
  const { error: errorProfile } = useSelector(getProfileState);
  const { error: errorAuth } = useSelector(getAuthState);
  const { setRequestError } = useRequestError();

  const callErrorHandler = () => {
		errorProfile === 'jwt expired' && dispatch(clearProfileError()) && dispatch(postToken(refreshToken)); 
    errorProfile && setRequestError(errorProfile) && dispatch(clearProfileError());
    errorAuth && setRequestError(errorAuth) && dispatch(clearAuthError());
  };

  return { callErrorHandler };
};
