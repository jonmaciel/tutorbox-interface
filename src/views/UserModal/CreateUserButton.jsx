import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import FormUser from './FormUser.jsx';

class CreateUserButton extends Component {
  state = {
    modalOpen: false
  }

  onCreate = variables =>
    this.props.mutate({
      variables: { ...variables }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );

  render () {
    return (
      <div>
        <FormUser
          onSubmit={this.onCreate}
          onChange={this.onChange}
          onCancel={() => this.setState({ modalOpen: false }) }
          organizationId={this.props.organizationId}
          modalOpen={this.state.modalOpen}
          refetch={this.props.refetch}
          isTutormaker={this.props.isTutormaker}
          title="Novo Usuário"
        />
        <a href="#" onClick={() => this.setState({ modalOpen: true })}>Novo</a>
      </div>
    )
  }
}


CreateUserButton.propTypes = {
  refetch: PropTypes.func.isRequired,
  organizationId: PropTypes.string.isRequired,
  isTutormaker: PropTypes.bool.isRequired,
};

export default graphql(gql`
  mutation createNewUser(
    $name: String!,
    $email: String!,
    $organizationId: ID,
    $systemId: ID,
    $userRole: UserRoles,
    $password: String,
    $passwordConfirmation: String
  ) {
    createUser(
      input: {
        newUserAttributes: {
          name: $name,
          email: $email,
          organization_id: $organizationId,
          system_id: $systemId,
          user_role: $userRole,
          password: $password,
          password_confirmation: $passwordConfirmation,
        }
      }
    ) {
        user { id }
      }
  }`)(CreateUserButton);
