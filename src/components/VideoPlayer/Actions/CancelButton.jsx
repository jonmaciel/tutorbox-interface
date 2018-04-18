import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ConfirmModal } from 'components';
import { withStyles, Tooltip } from 'material-ui';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { tasksStyle } from 'variables/styles';

class CancelVideo extends Component {
  state = {
    modalOpen: false,
  }

  onDelete = () => {
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
      <span>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onDelete}
        >
          Realmente deseja Cancelar o vídeo?
        </ConfirmModal>
        <Tooltip
          id="tooltip-top"
          title="Cancelar a rquisição"
          placement="top"
          classes={{tooltip: this.props.classes.tooltip}}
        >
          <span>
            <Button color="danger" onClick={() => this.setState({ modalOpen: true })}>
              Cancelar Vídeo
            </Button>
          </span>
        </Tooltip>
      </span>
    )
  }
}

CancelVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation($videoId: ID!) {
    changeVideoState(
      input: {
        videoId: $videoId,
        event: "cancel_video",
      }
    ) {
      success
    }
  }`
)(withStyles(tasksStyle)(CancelVideo));
