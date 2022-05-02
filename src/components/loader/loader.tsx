import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Flex } from '../flex/flex';

import loader from './loader.module.css';

interface LoaderPropsType {
  type?: 'small' | 'medium' | 'large';
  height?: number;
  width?: number;
  color?: string;
}

export const Loader = ({
  type = 'large',
  height = 100,
  width = 100,
  color = 'var(--colors-interface-success)',
}: LoaderPropsType) => (
  <Flex flexDirection='column' className={loader.container}>
    <Flex className={loader.wrapper}>
      <ThreeDots height={height} width={width} color={color} />
    </Flex>
  </Flex>
);
