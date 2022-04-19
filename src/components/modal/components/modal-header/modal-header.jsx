import React from 'react';
import cn from 'classnames';
import { Flex } from '../../../flex/flex';
import { Title } from '../../../title/title';

import modalHeader from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const ModalHeader = ({ title, onClose }) => (
  <Flex className={title ? modalHeader.wrapper : cn('mb-10 pt-5', modalHeader.wrapper_end)}>
    {title && <Title type={'h1'}>{title}</Title>}
	<CloseIcon type="primary" />
  </Flex>
);
