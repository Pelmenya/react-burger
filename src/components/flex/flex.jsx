import React from 'react';

export const Flex = ({ flexDirection = 'row', gap = '0', className = '', children }) => (
  <div style={{ flexDirection: flexDirection, gap: gap, display: 'flex' }} className={className}>
    {children}
  </div>
);
