import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tooltip } from 'material-ui';
import { Button, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { tasksStyle } from 'variables/styles';

class ApproveButton extends Component {
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
    }).catch(error => {
      console.log('there was an error sending the query', error);
    });
  }

  render() {
    const { classes: { tooltip } } = this.props;
    return(
      <span>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onSendToProduction}
        >
          Realmente deseja <strong>aprovar</strong> vídeo?
        </ConfirmModal>
         <Tooltip
          id="tooltip-top"
          title="Aprovar vídeo"
          placement="top"
          classes={{ tooltip }}
        >
          <span>
            <Button color="success" onClick={() => this.setState({ modalOpen: true })}>
              Aprovar Vídeo
            </Button>
          </span>
        </Tooltip>
      </span>
    )
  }
}

ApproveButton.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation($videoId: ID!) {
    changeVideoState(
      input: {
        videoId: $videoId,
        event: "approved_by_customer",
      }
    ) {
      success
    }
  }`
)(withStyles(tasksStyle)(ApproveButton));
