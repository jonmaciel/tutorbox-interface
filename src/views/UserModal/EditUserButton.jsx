import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import FormUser from './FormUser.jsx';

class EditUserButton extends Component {
  state = {
    modalOpen: false
  }

  onCreate = variables => {
    this.props.mutate({
      variables: {
        id: this.props.user.id,
        ...variables
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch(error => {
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    const { user } = this.props;

    return (
      <div>
        <FormUser
          {...user}
          onSubmit={this.onCreate}
          onChange={this.onChange}
          onCancel={() => this.setState({ modalOpen: false }) }
          organizationId={this.props.organizationId}
          modalOpen={this.state.modalOpen}
          refetch={this.props.refetch}
          isTutormaker={this.props.isTutormaker}
          title="Editar Usuário"
        />
        <a href="#" onClick={() => this.setState({ modalOpen: true })}>Edit</a>
      </div>
    )
  }
}


EditUserButton.propTypes = {
  user: PropTypes.object.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  isTutormaker: PropTypes.bool.isRequired,
};

export default graphql(gql`
  mutation createNewUser(
    $id: ID!,
    $name: String!,
    $email: String!,
    $userRole: UserRoles!,
    $password: String,
    $passwordConfirmation: String,
    $organizationId: ID,
    $systemId: ID
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
          organization_id: $organizationId,
          system_id: $systemId,
          password_confirmation: $passwordConfirmation,
        }
      }
    ) {
      user { id }
    }
  }`)(EditUserButton);
