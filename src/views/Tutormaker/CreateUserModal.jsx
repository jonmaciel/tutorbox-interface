import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button } from 'components';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import FormTutormaker from './FormTutormaker.jsx';

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

class CreateUserModal extends Component {
  onCreate = variables => {
    this.props.mutate({
      variables: { ...variables }
    }).then(({ data }) => {
      this.props.refetch();
      this.props.closeModal();
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
        contentLabel="Novo Tutormaker"
      >
        <FormTutormaker
          onSubmit={this.onCreate}
          onChange={this.onChange}
          onCancel={this.props.closeModal}
          organizationId={this.props.organizationId}
        />
      </Modal>
    )
  }
}


CreateUserModal.propTypes = {
  data: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  organizationId: PropTypes.string.isRequired,
};

export default graphql(gql`
  mutation createNewUser(
    $name: String!,
    $email: String!,
    $userRole: UserRoles,
    $password: String,
    $passwordConfirmation: String
  ) {
    createUser(
      input: {
        newUserAttributes: {
          name: $name,
          email: $email,
          user_role: $userRole,
          password: $password,
          password_confirmation: $passwordConfirmation,
        }
      }
    ) {
        user { id }
      }
  }`)(CreateUserModal);
