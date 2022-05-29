import React, { useMemo } from 'react';
import appHeader from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from './components/nav-link/nav-link';
import { Link } from 'react-router-dom';
import { getHeaderNavState } from '../../services/redux/selectors/header-nav';
import { useSelector } from 'react-redux';
import { getProfileState } from '../../services/redux/selectors/profile';

export const AppHeader = () => {
  const { user } = useSelector(getProfileState);
  const { activeLink } = useSelector(getHeaderNavState);

  const main = useMemo(() => (activeLink === '/' ? 'primary' : 'secondary'), [
    activeLink,
  ]);
  const feed = useMemo(() => (activeLink === 'feed' ? 'primary' : 'secondary'), [
    activeLink,
  ]);
  const profile = useMemo(() => (activeLink === 'profile' ? 'primary' : 'secondary'), [
    activeLink,
  ]);

  return (
    <header className={appHeader.header}>
      <nav className={appHeader.header__nav}>
        <div className={appHeader.header__wrap}>
          <Link to='/' className={appHeader.header__link}>
            <NavLink icon={<BurgerIcon type={main} />} type={main} text={'Конструктор'} />
          </Link>
          <Link to='/login' className={appHeader.header__link}>
            <NavLink icon={<ListIcon type={feed} />} type={feed} text={'Лента заказов'} />
          </Link>
        </div>
        <div className={appHeader.header__logo}>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <Link to={user ? '/profile' : '/login'} className={appHeader.header__link}>
          <NavLink icon={<ProfileIcon type={profile} />} type={profile} text={user?'Личный кабинет' : 'Войти'} />
        </Link>
      </nav>
    </header>
  );
};
