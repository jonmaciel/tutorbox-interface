import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tooltip } from 'material-ui';
import { Button, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { tasksStyle } from 'variables/styles';

class SendToScreenwriterRevision extends Component {
  state = {
    modalOpen: false
  }

  onSendToProduction = () => {
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
    const { disabled, classes } = this.props;
    return(
      <span>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onSendToProduction}
        >
          Realmente deseja enviar o vídeo para revisão do roteirista?
        </ConfirmModal>
        <span>
          <Button color="success" onClick={() => this.setState({ modalOpen: true })}>
            Enviar para revisão do roteirista
          </Button>
        </span>
      </span>
    )
  }
}

SendToScreenwriterRevision.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  disabled: PropTypes.boolean,
};

export default graphql(gql`
  mutation($videoId: ID!) {
    changeVideoState(
      input: {
        videoId: $videoId,
        event: "send_to_screenwriter_revision",
      }
    ) {
      success
    }
  }`
)(withStyles(tasksStyle)(SendToScreenwriterRevision));
