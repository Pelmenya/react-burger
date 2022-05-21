import React, { useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router';
import { BadRequest } from '../../components/bad-request/bad-request';
import { MenuProfile } from '../../components/menu-profile/menu-profile';
import { useNavHeader } from '../../hooks/useNavHeader';

import profilePage from './profile-page.module.css';

export const ProfilePage = () => {
  const { setActive } = useNavHeader();

  useEffect(
    () => {
      setActive('profile');
    },
    [
      setActive,
    ],
  );

  return (
    <main className='auth-container'>
 			<MenuProfile />
			<Outlet />
    </main>
  );
};
