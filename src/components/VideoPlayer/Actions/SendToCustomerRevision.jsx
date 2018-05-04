import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tooltip } from 'material-ui';
import { Button, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { tasksStyle } from 'variables/styles';

class SendToProductionButton extends Component {
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
          Realmente deseja enviar a revisão do cliente?
        </ConfirmModal>
        <span>
          <Button color="success" onClick={() => this.setState({ modalOpen: true })}>
            Enviar para revisão do cliente
          </Button>
        </span>
      </span>
    )
  }
}

SendToProductionButton.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  disabled: PropTypes.boolean,
};

export default graphql(gql`
  mutation($videoId: ID!) {
    changeVideoState(
      input: {
        videoId: $videoId,
        event: "send_to_customer_revision",
      }
    ) {
      success
    }
  }`
)(withStyles(tasksStyle)(SendToProductionButton));
