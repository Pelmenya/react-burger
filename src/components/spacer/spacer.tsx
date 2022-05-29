import React from 'react';
import PropTypes from 'prop-types';

export interface SpacerPropsType {
  spaceHeight?: number;
  spaceWidth?: number;
}

export const Spacer = ({ spaceHeight, spaceWidth }: SpacerPropsType) => (
  <div style={{ width: spaceWidth ? spaceWidth : '', height: spaceHeight ? spaceHeight : '' }} />
);

Spacer.propTypes = {
  spaceHeight: PropTypes.number,
  spaceWidth: PropTypes.number,
};
