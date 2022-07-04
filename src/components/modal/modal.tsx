import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import modal from './modal.module.css';
import { ModalOverlay } from './components/modal-overlay/modal-overlay';
import { Flex } from '../flex/flex';
import { ModalHeader } from './components/modal-header/modal-header';

export interface ModalPropsType {
  children?: JSX.Element;
  title?: string | JSX.Element;
  handlerOnClose: () => void;
}

export const Modal = ({ children, title, handlerOnClose }: ModalPropsType) => {
  const handlerKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handlerOnClose();
    },
    [
      handlerOnClose,
    ],
  );

  useEffect(
    () => {
      document.addEventListener('keydown', handlerKeyPress);
      return () => document.removeEventListener('keydown', handlerKeyPress);
    },
    [
      handlerKeyPress,
    ],
  );

  return createPortal(
    <Flex className={modal.wrapper}>
      <ModalOverlay handlerOnClose={handlerOnClose} />
      <div className={cn('pt-10 pb-15 pr-10 pl-10', modal.content)}>
        <ModalHeader title={title} handlerOnClose={handlerOnClose} />
        {children}
      </div>
    </Flex>,
    document.getElementById('react-modals') as Element,
  );
};