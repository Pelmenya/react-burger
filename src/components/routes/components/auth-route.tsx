import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { To } from 'history';
import { getProfileState } from '../../../services/redux/selectors/profile';
import { RoutePropsType } from '../../../utils/types/route-props-type';

export const AuthRoute = ({ redirect, element }: RoutePropsType): JSX.Element => {
  const { user } = useSelector(getProfileState);

  return !user ? (
    element
  ) : (
    <Navigate to={{ pathname: redirect} as To} />
  );
};
