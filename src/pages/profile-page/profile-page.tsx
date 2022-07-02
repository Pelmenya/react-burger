import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { MenuProfile } from '../../components/menu-profile/menu-profile';
import { useNavHeader } from '../../hooks/use-nav-header';

import profilePage from './profile-page.module.css';
import { useMenuProfile } from '../../hooks/use-menu-profile';
import { profileRegExp } from '../../utils/regexp';
import { useDispatch, useSelector } from 'react-redux';
import { wsInitUserOrders } from '../../services/redux/slices/orders';
import { getOrdersState } from '../../services/redux/selectors/orders';

export const ProfilePage = () => {
  const { setActive } = useNavHeader();
  const { setActiveMenuProfile } = useMenuProfile();
  const { socketUser } = useSelector(getOrdersState);

  const dispatch = useDispatch();
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
        dispatch(wsInitUserOrders('UserOrders'));
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
