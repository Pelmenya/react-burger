import React from 'react';
import { ModalHeaderPropsType } from '../modal-header/modal-header';
import modalOverlay from './modal-overlay.module.css';

export const ModalOverlay = ({ handlerOnClose }: Omit<ModalHeaderPropsType, 'title'>) => {
  return <div className={modalOverlay.overlay} onClick={handlerOnClose} />;
};
