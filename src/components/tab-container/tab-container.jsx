import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { Flex } from '../flex/flex';
import tabContainer from './tab-container.module.css';

export const TabContainer = ({ children }) => (
  <Flex flexDirection={'column'} className={cn('custom-scroll', tabContainer.container)}>
    {children}
  </Flex>
);

TabContainer.propTypes = {
  children: PropTypes.node,
};
