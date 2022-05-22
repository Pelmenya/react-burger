import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { MenuProfile } from '../../components/menu-profile/menu-profile';
import { useNavHeader } from '../../hooks/useNavHeader';

import profilePage from './profile-page.module.css';
import { useMenuProfile } from '../../hooks/useMenuProfile';

export const ProfilePage = () => {
  const { setActive } = useNavHeader();
  const { setActiveMenuProfile } = useMenuProfile();

  const location = useLocation();
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
      console.log(location.pathname);
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
    <main className={isOrderPage ? 'center-container' : profilePage.container}>
      {!isOrderPage && <MenuProfile />}
      <Outlet />
    </main>
  );
};
