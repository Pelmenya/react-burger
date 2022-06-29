import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from '../services/redux/selectors/auth';
import { getOrderState } from '../services/redux/selectors/order';
import { getProfileState } from '../services/redux/selectors/profile';
import { clearAuthError, postToken } from '../services/redux/slices/auth';
import { clearOrderError } from '../services/redux/slices/order';
import { clearProfileError } from '../services/redux/slices/profile';
import { JWT_EXPIRED } from '../utils/constants';
import { DispatchType } from '../utils/types/dispatch-type';
import { useRequestError } from './use-request-error';

export const useErrorHandler = () => {
  const dispatch = useDispatch<DispatchType>();
  const refreshToken = localStorage.getItem('refreshToken');
  const { error: errorOrder } = useSelector(getOrderState);
  const { error: errorProfile } = useSelector(getProfileState);
  const { error: errorAuth } = useSelector(getAuthState);
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

    if (errorOrder === JWT_EXPIRED) {
      dispatch(clearOrderError());
      dispatch(postToken(refreshToken));
    }

    if (errorOrder && errorOrder !== JWT_EXPIRED ) {
      setRequestError(errorOrder);
      dispatch(clearOrderError());
    }

  };

  return { callErrorHandler };
};
