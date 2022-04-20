import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { Flex } from '../../../flex/flex';
import { Title } from '../../../title/title';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalHeader from './modal-header.module.css';

export const ModalHeader = ({ title, handlerOnClose }) => (
  <Flex
    flexDirection={title ? 'row' : 'column'}
    className={
      title ? modalHeader.wrapper : cn('pt-5 pb-5', modalHeader.wrapper, modalHeader.wrapper_end)
    }>
    {title && <Title type={'h1'}>{title}</Title>}
    <button className={modalHeader.buttonClose} onClick={handlerOnClose}>
      <CloseIcon type='primary' />
    </button>
  </Flex>
);

ModalHeader.propTypes = {
  title: PropTypes.string,
  handlerOnClose: PropTypes.func,
};
