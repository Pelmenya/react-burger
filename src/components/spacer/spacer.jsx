import React from 'react';
import PropTypes from 'prop-types';

export const Spacer = ({ spaceHeight = false, spaceWidth = false }) => (
  <div style={{ width: spaceWidth ? spaceWidth : '', height: spaceHeight ? spaceHeight : '' }} />
);

Spacer.propTypes = {
  spaceHeight: PropTypes.number,
  spaceWidth: PropTypes.number,
};
