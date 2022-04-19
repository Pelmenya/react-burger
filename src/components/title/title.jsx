import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export const Title = ({ type, className = '', children }) => {
  switch (type) {
    case 'h1':
      return <h1 className={cn('text text_type_main-large', className)}>{children}</h1>;
    case 'h2':
      return <h2 className={cn('text text_type_main-medium', className)}>{children}</h2>;
    case 'h3':
      return <h3 className={cn('text text_type_main-medium', className)}>{children}</h3>;
    default:
      return <h6 className={cn('text text_type_main-default', className)}>{children}</h6>;
  }
};

Title.propTypes = {
  type: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
  ]),
  className: PropTypes.string,
  children: PropTypes.node,
};
