import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { RoutePropsType } from '../../../utils/types/route-props-type';

export const ProtectedRoute = ({ redirect, element }: RoutePropsType): JSX.Element => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  return accessToken ? element : <Navigate to={redirect} state={{ from: location }} />;
};
