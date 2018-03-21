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

class ModalNewVideo extends Component {

  onCreate = ({ name, email, userRole, systemId }) => {
    this.props.mutate({
      variables: {
        id: this.props.user.id,
        name,
        email,
        userRole,
        systemId
      }
    }).then(({ data }) => {
      this.props.refetchOrganization();
      this.props.closeModal();
    }).catch(error => {
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    const { user } = this.props;

    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.props.afterOpenModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Editar Usuário"
      >
        {
          user &&
          <FormUser
            {...user}
            onSubmit={this.onCreate}
            onCancel={this.props.closeModal}
            organizationId={this.props.organizationId}
          />
        }
      </Modal>
    )
  }
}


ModalNewVideo.propTypes = {
  data: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  refetchOrganization: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation createNewUser(
    $id: ID!,
    $systemId: ID,
    $name: String!,
    $email: String!,
    $userRole: UserRoles!,
  ) {
    updateUser(
      input: {
        id: $id,
        userAttributes: {
          email: $email,
          name: $name,
          email: $email,
          system_id: $systemId,
          user_role: $userRole,
        }
      }
    ) {
      user { id }
    }
  }`)(ModalNewVideo);
