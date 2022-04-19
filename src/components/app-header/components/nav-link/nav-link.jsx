import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import navLink from './nav-link.module.css';

export const NavLink = ({ icon, text, type }) => (
  <div className={navLink.link}>
    <div className={'mr-2'} children={icon} />
    {type === 'primary' ? (
      <p className={cn('text text_type_main-default', navLink.link__text)}>{text}</p>
    ) : (
      <p className={cn('text text_type_main-default text_color_inactive', navLink.link__text)}>
        {text}
      </p>
    )}
  </div>
);

NavLink.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  type: PropTypes.string,
};
