import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from '../flex/flex';
import tabContainer from './tab-container.module.css';

export const TabContainer = ({ children }) => (
  <Flex flexDirection={'column'} className={tabContainer.container}>
    {children}
  </Flex>
);

TabContainer.propTypes = {
  children: PropTypes.node,
};
