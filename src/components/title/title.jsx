import React from 'react';
import cn from 'classnames'

export const Title = ({ type, className = '', children }) => {
  switch (type) {
    case 'h1':
      return <h1 className={cn('text text_type_main-large', className)}>{children}</h1>;
    case 'h3':
      return <h3 className={cn('text text_type_main-medium', className)}>{children}</h3>;
    default:
      return <h6 className={cn('text text_type_main-default', className)}>{children}</h6>;
  }
};
