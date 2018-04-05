import React, { Component } from 'react';
import { Button } from 'components';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ConfirmModal extends Component {
  handleConfirm = () => {
    this.props.onConfirm();
    this.props.onClose();
  }

  render () {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.props.afterOpenModal}
        onRequestClose={this.props.onClose}
        style={customStyles}
        contentLabel="Confirm Modal"
      >
        <div>
          <h4>{this.props.children}</h4>
          <Button onClick={this.props.onClose} color="error">Cancelar</Button>
          <Button onClick={this.handleConfirm} color="success">Confirmar</Button>
        </div>
      </Modal>
    )
  }
}


ConfirmModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
};

export default ConfirmModal
