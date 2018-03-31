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

class ModalNewVideo extends Component {

  onCreate = variables => {
    this.props.mutate({
      variables: {
        id: this.props.user.id,
        ...variables
      }
    }).then(({ data }) => {
      this.props.refetch();
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
        contentLabel="Editar Tutormaker"
      >
        {
          user &&
          <FormTutormaker
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
  refetch: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation createNewUser(
    $id: ID!,
    $name: String!,
    $email: String!,
    $userRole: UserRoles!,
    $password: String,
    $passwordConfirmation: String,
  ) {
    updateUser(
      input: {
        id: $id,
        userAttributes: {
          email: $email,
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
  }`)(ModalNewVideo);
