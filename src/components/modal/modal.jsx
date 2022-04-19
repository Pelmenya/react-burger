import React from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';

import modal from './modal.module.css';
import { ModalOverlay } from './components/modal-overlay/modal-overlay';
import { Flex } from '../flex/flex';
import { ModalHeader } from './components/modal-header/modal-header';

export const Modal = ({ children, header, handlerOnClose }) => {
  return createPortal(
    <Flex className={modal.wrapper}>
      <ModalOverlay onClose={handlerOnClose} />
      <div className={cn('pt-10 pb-15 pr-10 pl-10', modal.content)}>
        <ModalHeader title={'ddd dfgsfdg sdfgsdfg sdfgsdfg'} handlerOnClose={handlerOnClose}/>
        {children}
        {'2f1dg2dfg1d2f1g2'}
      </div>
    </Flex>,
    document.getElementById('react-modals'),
  );
};

Modal.propTytpes = {
  children: PropTypes.node,
  header: PropTypes.node,
  handlerOnClose: PropTypes.func.isRequired,
};
