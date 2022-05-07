import React from 'react';
import cn from 'classnames';

import navLink from './nav-link.module.css';

export interface NavLinkPropsType {
  icon: JSX.Element;
  text: string;
  type: 'primary' | 'secondary';
}

export const NavLink = ({ icon, text, type } : NavLinkPropsType) => (
  <div className={navLink.link}>
    <div className={'mr-2'} children={icon} />
    {type === 'primary' ? (
      <p className={cn(navLink.link__text, navLink.link__text_active)}>{text}</p>
    ) : (
      <p className={cn(navLink.link__text, navLink.link__text_inactive)}>{text}</p>
    )}
  </div>
);