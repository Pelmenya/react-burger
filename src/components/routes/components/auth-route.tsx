import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { To } from 'history';
import { getProfileState } from '../../../services/redux/selectors/profile';

export const AuthRoute = ({ redirect, element }: any): any => {
  const { user } = useSelector(getProfileState);

  return !user ? (
    element
  ) : (
    <Navigate to={{ pathname: redirect} as To} />
  );
};
