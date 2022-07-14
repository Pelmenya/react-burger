import { getAuthState } from '../services/redux/selectors/auth';
import { getOrderState } from '../services/redux/selectors/order';
import { getProfileState } from '../services/redux/selectors/profile';
import { clearAuthError, postToken } from '../services/redux/slices/auth/auth';
import { clearOrderError } from '../services/redux/slices/order/order';
import { clearProfileError } from '../services/redux/slices/profile/profile';
import { JWT_EXPIRED } from '../utils/constants';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';
import { useRequestError } from './use-request-error';

export const useErrorHandler = () => {
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const { error: errorOrder } = useAppSelector(getOrderState);
  const { error: errorProfile } = useAppSelector(getProfileState);
  const { error: errorAuth } = useAppSelector(getAuthState);
  const { setRequestError } = useRequestError();

  const callErrorHandler = () => {
    if (errorProfile === JWT_EXPIRED) {
      dispatch(clearProfileError());
      dispatch(postToken(refreshToken));
    }

    if (errorProfile && errorProfile !== JWT_EXPIRED) {
      setRequestError(errorProfile);
      dispatch(clearProfileError());
    }

    if (errorAuth) {
      setRequestError(errorAuth);
      dispatch(clearAuthError());
    }

    if (errorOrder && errorOrder !== JWT_EXPIRED) {
      setRequestError(errorOrder);
      dispatch(clearOrderError());
    }
  };

  return { callErrorHandler };
};
