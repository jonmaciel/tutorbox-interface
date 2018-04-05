import React, { Component } from 'react';
import { ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

class ButtonModalDelete extends Component {
  state = {
    modalOpen: false
  }

  onDelete = () => {
    this.props.mutate({
      variables: {
        id: this.props.video.id,
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
           Você tem certeza que deseja deletar deletar o vídeo
              <strong> {this.props.video.title} </strong>
        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>
          Deletar
        </a>
      </div>
    )
  }
}


ButtonModalDelete.propTypes = {
  refetch: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation ButtonModalDelete($id: ID!) {
    destroyVideo(
      input: {
        id: $id,
      }
    ) {
      success
    }
  }`)(ButtonModalDelete);
