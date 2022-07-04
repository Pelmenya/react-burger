import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { MenuProfile } from '../../components/menu-profile/menu-profile';
import { useNavHeader } from '../../hooks/use-nav-header';

import profilePage from './profile-page.module.css';
import { useMenuProfile } from '../../hooks/use-menu-profile';
import { profileRegExp } from '../../utils/regexp';
import { wsInitUserOrders } from '../../services/redux/slices/orders';
import { getOrdersState } from '../../services/redux/selectors/orders';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export const ProfilePage = () => {
  const { setActive } = useNavHeader();
  const { setActiveMenuProfile } = useMenuProfile();
  const { socketUser } = useAppSelector(getOrdersState);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const isProfile = profileRegExp.test(location.pathname);

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
      if (!socketUser) {
        dispatch(wsInitUserOrders());
      }
    },
    [
      dispatch,
      socketUser
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
