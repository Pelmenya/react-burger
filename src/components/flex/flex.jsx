import React from 'react';
import PropTypes from 'prop-types';

export const Flex = ({ flexDirection = 'row', gap = 0, className = '', children }) => (
  <div style={{ flexDirection: flexDirection, gap: gap, display: 'flex' }} className={className}>
    {children}
  </div>
);

Flex.propTypes = {
  flexDirection: PropTypes.oneOf(['row', 'column']),
  gap: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
}