import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tooltip } from 'material-ui';
import { Button, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { tasksStyle } from 'variables/styles';

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
    const { disabled, classes } = this.props;
    return(
      <span>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onSendRequest}
        >
          Realmente deseja enviar o vídeo para produção?
        </ConfirmModal>
         <Tooltip
          id="tooltip-top"
          title={disabled ?  'Preencha a descrição' : 'Enviar para produção'}
          placement="top"
          classes={{tooltip: classes.tooltip}}
        >
          <span>
            <Button disabled={disabled} color="success" onClick={() => this.setState({ modalOpen: true })}>
              Enviar requisoção
            </Button>
          </span>
        </Tooltip>
      </span>
    )
  }
}

SendVideoRequest.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  disabled: PropTypes.boolean,
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
)(withStyles(tasksStyle)(SendVideoRequest));
