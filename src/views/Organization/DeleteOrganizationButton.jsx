import React, { Component } from 'react';
import { ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class DeleteOrganizationButton extends Component {
  state = {
    modalOpen: false
  }

  onDelete = () => {
    this.props.mutate({
      variables: {
        id: this.props.organization.id,
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
          Você tem certeza que deseja deletar deletar a organização
          <strong> {this.props.organization.name} </strong>
          ?
        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>
          Deletar
        </a>
      </div>
    )
  }
}


DeleteOrganizationButton.propTypes = {
  data: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation deleteOrganizationButton($id: ID!) {
    destroyOrganization(
      input: {
        id: $id,
      }
    ) {
      success
    }
  }`)(DeleteOrganizationButton);
