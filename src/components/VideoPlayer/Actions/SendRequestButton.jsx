import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SendVideoRequest extends Component {
  state = {
    modalOpen: false
  }

  onSendRequest = () => {
    this.props.mutate({
      variables: {
        videoId: this.props.videoId,
      }
    }).then(({ data }) => {
      this.props.refetchVideo();
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  render() {
    return(
      <div>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onSendRequest}
        >
          Realmente deseja enviar o vídeo para produção?
        </ConfirmModal>
        <Button color="success" onClick={() => this.setState({ modalOpen: true })}>
          Enviar requisoção
        </Button>
      </div>
    )
  }
}

SendVideoRequest.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation($videoId: ID!) {
    changeVideoState(
      input: {
        videoId: $videoId,
        event: "send_request",
      }
    ) {
      success
    }
  }`
)(SendVideoRequest);
