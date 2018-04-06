import React, { Component } from 'react';
import { ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class DeleteUserButton extends Component {
  state = {
    modalOpen: false
  }

  onDelete = () => {
    this.props.mutate({
      variables: {
        id: this.props.user.id,
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return (
      <div>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onDelete}
        >
          Você tem certeza que deseja deletar deletar o Tutormaker
          <strong> {this.props.user.name} </strong>
          ?
        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>
          Deletar
        </a>
      </div>
    )
  }
}


DeleteUserButton.propTypes = {
  refetch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation deleteUserButton($id: ID!) {
    destroyUser(
      input: {
        id: $id,
      }
    ) {
      success
    }
  }`)(DeleteUserButton);
