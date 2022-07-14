import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { MenuProfile } from '../../components/menu-profile/menu-profile';
import { useNavHeader } from '../../hooks/use-nav-header';

import profilePage from './profile-page.module.css';
import { useMenuProfile } from '../../hooks/use-menu-profile';
import { profileRegExp } from '../../utils/regexp';
import { wsClose, wsInit } from '../../services/redux/slices/orders/orders';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { SOCKET } from '../../utils/api-constants/ws';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getProfileState } from '../../services/redux/selectors/profile';

export const ProfilePage = () => {
  const { setActive } = useNavHeader();
  const { setActiveMenuProfile } = useMenuProfile();
  const { user } = useAppSelector(getProfileState);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const isProfile = profileRegExp.test(location.pathname);

  const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];

  const [
    isOrderPage,
    setIsOrderPage,
  ] = useState(false);

  useEffect(
    () => {
      setActive('profile');
    },
    [
      setActive,
    ],
  );

  useEffect(
    () => {
      if (user) {
        dispatch(wsInit(`${SOCKET}?token=${accessToken}`));
        return () => {
          dispatch(wsClose());
        };
      }
    },
    [
      dispatch,
      accessToken,
      user,
    ],
  );

  useEffect(
    () => {
      switch (location.pathname) {
        case '/profile':
          isOrderPage && setIsOrderPage(false);
          setActiveMenuProfile('profile');
          break;
        case '/profile/orders':
          isOrderPage && setIsOrderPage(false);
          setActiveMenuProfile('orders');
          break;
        default:
          setActiveMenuProfile('orders');
          setIsOrderPage(true);
      }
    },
    [
      location,
      isOrderPage,
      setIsOrderPage,
      setActiveMenuProfile,
    ],
  );

  return (
    <main className={isProfile ? profilePage.container : 'center-container'}>
      {isProfile && <MenuProfile />}
      <Outlet />
    </main>
  );
};
