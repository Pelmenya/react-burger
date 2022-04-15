import React from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import tabContainer from './tab-container.module.css';

export const TabContainer = ({ title, children }) => (
  <Flex flexDirection={'column'} className={cn('custom-scroll', tabContainer.container)}>
    {children}
  </Flex>
);
