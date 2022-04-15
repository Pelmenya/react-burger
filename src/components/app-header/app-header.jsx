import React from 'react';
import cn from 'classnames';
import appHeader from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from './components/nav-link/nav-link';

export const AppHeader = () => {
  return (
    <header className={appHeader.header}>
      <nav className={appHeader.header__nav}>
        <div
          className={cn(
            appHeader.header__wrap,
            appHeader.header__spacebetween,
            appHeader.header__wrap_width100,
          )}>
          <div
            className={cn(
              appHeader.header__wrap,
              appHeader.header__spacebetween,
              appHeader.header__wrap_width,
            )}>
            <div className={appHeader.header__wrap}>
              <NavLink icon={<BurgerIcon type='primary' />} type={'primary'} text={'Конструктор'} />
              <NavLink
                icon={<ListIcon type='secondary' />}
                type={'secondary'}
                text={'Лента заказов'}
              />
            </div>
            <Logo />
          </div>
          <NavLink
            icon={<ProfileIcon type='secondary' />}
            type={'secondary'}
            text={'Личный кабинет'}
          />
        </div>
      </nav>
    </header>
  );
};
