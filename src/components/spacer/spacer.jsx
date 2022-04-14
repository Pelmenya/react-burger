import React from 'react';

export const Spacer = ({ spaceHeight = false, spaceWidth = false }) => (
  <div style={{ width: spaceWidth ? spaceWidth : '', height: spaceHeight ? spaceHeight : '' }} />
);
