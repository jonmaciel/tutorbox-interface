import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button } from 'components';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
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

class DeleteUser extends Component {
  onCancel = () => {
    this.props.closeModal();
  }

  onCreate = () => {
    this.props.mutate({
      variables: {
        id: this.props.user.id,
      }
    }).then(({ data }) => {
      this.props.refetch();
      this.onCancel();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.props.afterOpenModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Deletar Usuário"
      >
        {
          this.props.user ?
          <div>
            <h4 ref={subtitle => this.subtitle = subtitle}>
              Você tem certeza que deseja deletar deletar o Tutormaker
              <strong> {this.props.user.name} </strong>
              ?
            </h4>
            <Button onClick={this.props.closeModal} color="error">Cancel</Button>
            <Button onClick={this.onCreate} color="success">Deletar</Button>
          </div>:
          <div />
        }
      </Modal>
    )
  }
}


DeleteUser.propTypes = {
  data: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  refetchUsers: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation deleteUser($id: ID!) {
    destroyUser(
      input: {
        id: $id,
      }
    ) {
      success
    }
  }`)(DeleteUser);
