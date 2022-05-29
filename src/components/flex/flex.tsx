import React, { ReactElement } from 'react';

export interface FlexType {
  flexDirection?: 'row' | 'column';
  gap?: number;
  className?: string;
  children?: ReactElement | ReactElement[];
}

export const Flex = ({ flexDirection = 'row', gap = 0, className = '', children }: FlexType) => (
  <div style={{ flexDirection: flexDirection, gap: gap, display: 'flex' }} className={className}>
    {children}
  </div>
);
