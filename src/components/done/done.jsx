import React from 'react';
import cn from 'classnames';

import { Flex } from '../flex/flex';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as BGLarge } from '../../images/order-bg-large.svg';
import { ReactComponent as BGMedium } from '../../images/order-bg-medium.svg';
import { ReactComponent as BGSmall } from '../../images/order-bg-small.svg';

import done from './done.module.css';

export const Done = () => (
  <Flex className={done.wrapper}>
    <BGLarge className={done.icon} />
    <BGMedium className={cn(done.icon, done.icon_back)} />
    <BGSmall className={cn(done.icon, done.icon_none)} />
    <div className={done.check}>
      <CheckMarkIcon type={'primary'} />
    </div>
  </Flex>
);
