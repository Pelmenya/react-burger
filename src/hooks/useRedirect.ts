import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getProfileState } from '../services/redux/selectors/profile';

export const useRedirect = (path: string) => {
  const navigate = useNavigate();
  const { user } = useSelector(getProfileState);

  useEffect(
    () => {
      user && navigate(path, { replace: true });
    },
    [
      user,
      navigate,
      path,
    ],
  );

  return { isAuth: user };
};
