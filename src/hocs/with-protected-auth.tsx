import React from 'react';
import { useSelector } from 'react-redux';
import { getProfileState } from '../services/redux/selectors/profile';
import { Navigate } from 'react-router';

export const withProtectedAuth = (redirect: string, Component: React.FC): any => () => {
  const { user } = useSelector(getProfileState);
  return user ? <Component /> : <Navigate to={redirect} replace />;
};
