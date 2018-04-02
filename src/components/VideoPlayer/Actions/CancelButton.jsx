import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CancelVideo extends Component {
  onClick = () => {
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
      <Button color="danger" onClick={this.onClick}>Cancelar Vídeo</Button>
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
)(CancelVideo);
