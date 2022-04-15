import React from 'react';
import cn from 'classnames';
import navLink from './nav-link.module.css';
import { Spacer } from '../../../spacer/spacer';

export const NavLink = ({ icon, text, type }) => (
  <div className={navLink.link}>
    <div children={icon} />
    <Spacer spaceWidth={8} />
    {type === 'primary' ? (
      <p className={cn('text text_type_main-default', navLink.link__text)}>{text}</p>
    ) : (
      <p className={cn('text text_type_main-default text_color_inactive', navLink.link__text)}>
        {text}
      </p>
    )}
  </div>
);
