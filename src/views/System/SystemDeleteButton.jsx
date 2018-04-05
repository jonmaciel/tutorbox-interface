import React, { Component } from 'react';
import { ConfirmModal } from 'components';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

class SystemDeleteButton extends Component {
  state = {
    modalOpen: false
  }

  onDelete = () =>
    this.props.mutate({
      variables: {
        id: this.props.system.id,
      }
    }).then(({ data }) => {
      this.props.refetch();
      this.onCancel();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );

  render () {
    return (
      <div>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onDelete}
        >
          Você tem certeza que deseja deletar deletar o systema
          <strong> {this.props.system.name} </strong>
          ?
        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>
          Deletar
        </a>
      </div>
    )
  }
}


SystemDeleteButton.propTypes = {
  refetch: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation deletesystem($id: ID!) {
    destroySystem(
      input: {
        id: $id,
      }
    ) {
      success
    }
  }`)(SystemDeleteButton);
