import React from 'react';
import { useSelector } from 'react-redux';
import { getProfileState } from '../services/redux/selectors/profile';
import { Navigate, useLocation } from 'react-router';
import { To } from 'history';
export const withProtectedAuth = (redirect: string, Component: React.FC): any => () => {
  const { user } = useSelector(getProfileState);
  const location = useLocation();

  return user ? (
    <Component />
  ) : (
    <Navigate to={{ pathname: redirect, state: { from: location } } as To} />
  );
};
