import React from 'react';
import modalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ handlerOnClose }) => {
  return <div className={modalOverlay.overlay} onClick={handlerOnClose} />;
};

ModalOverlay.propTypes = {
  handlerOnClose: PropTypes.func.isRequired,
};
