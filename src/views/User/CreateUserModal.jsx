import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button } from 'components';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import FormUser from './FormUser.jsx';

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
  onCreate = ({ name, email, userRole, systemId }) => {
    this.props.mutate({
      variables: {
        name,
        email,
        userRole,
        systemId,
        organizationId: this.props.organizationId,
      }
    }).then(({ data }) => {
      this.props.refetchOrganization();
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
        contentLabel="Novo Usuário"
      >
        <FormUser
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
  refetchOrganization: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  organizationId: PropTypes.string.isRequired,
};

export default graphql(gql`
  mutation createNewUser(
    $organizationId: ID!,
    $systemId: ID,
    $name: String!,
    $email: String!,
    $userRole: UserRoles
  ) {
    createUser(
      input: {
        newUserAttributes: {
          name: $name,
          email: $email,
          user_role: $userRole,
          system_id: $systemId,
          organization_id: $organizationId
        }
      }
    ) {
        user { id }
      }
  }`)(CreateUserModal);
