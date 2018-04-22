import React, { Component } from 'react';
import { RegularCard, ItemGrid } from 'components';
import { Grid } from 'material-ui';
import { Player } from 'video-react';
import { CustomInput } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { isVideoProducer } from '../../consts.jsx';
import AttachmentVideo from './AttachmentVideo.jsx';
import PropTypes from 'prop-types';

class VideoPlayerContainer extends Component {
  onVideoUpdate = ({ url }) => {
    this.props.mutate({
      variables: {
        id: this.props.id,
        url: url,
      }
    }).then(({ data }) => {
      this.props.refetch();
      console.log('saved');
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    const { id, url } = this.props;
    return (
      <RegularCard
        headerColor="blue"
        cardTitle="Vídeo"
        content={
          <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
              {
                url ?
                <div>
                  <Player
                    playsInline
                    src={`https://s3.us-east-2.amazonaws.com/tutorbox-files/${url}`}
                  />
                </div>
                : (isVideoProducer() && <AttachmentVideo videoId={id} onVideoUpdate={this.onVideoUpdate} />)
              }
            </ItemGrid>
          </Grid>
        }
      />
    )
  }
};

VideoPlayerContainer.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onVideoUpdate: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation($id: ID!, $url: String!) {
    updateVideo(
      input: {
        id: $id,
        videoAttributes: { url: $url }
      }
    ) {
      video { id }
    }
  }
`)(VideoPlayerContainer);
