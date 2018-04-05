import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid, CustomInput, Button, VideoPlayer, TaskList, CommentList } from 'components';
import "../../../node_modules/video-react/dist/video-react.css"
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class MediaPlayerIndex extends Component {
  render() {
    const { data: { video, refetch }, error } = this.props;

    if(error) { return <div>erroooou!</div>  }
    if(!video) { return <div/> }
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Link to="/videos">{"< Voltar para lista de vídeos"}</Link>
          <VideoPlayer {...video} refetch={refetch} />
          <TaskList tasks={video.tasks} />
          <CommentList videoId={video.id} />
        </ItemGrid>
      </Grid>
    );
  }
}

MediaPlayerIndex.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default graphql(gql`
query($videoId: ID!) {
  video(id: $videoId) {
    id
    title
    description
    aasm_state
    url
    tasks { id name done }
    comments {
      id
      body
      author { name }
    }
  }
}`,{
  options: (props) => ({ variables: { videoId: props.match.params.id } }),
})(MediaPlayerIndex);
