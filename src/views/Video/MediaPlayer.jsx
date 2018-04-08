import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid, CustomInput, Button, VideoPlayer, TaskList, CommentList, VideoSidebar } from 'components';
import "../../../node_modules/video-react/dist/video-react.css"
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import DescriptionLiveInput from './DescriptionLiveInput.jsx';
import Attachments from './Attachments.jsx';

class MediaPlayerIndex extends Component {
  render() {
    const { data: { video, refetch }, error } = this.props;

    if(error) { return <div>erroooou!</div>  }
    if(!video) { return <div/> }
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <Link to="/videos">{"< Voltar para lista de vídeos"}</Link>
            <VideoPlayer {...video} refetch={refetch} />
            <TaskList tasks={video.tasks} />
            <CommentList videoId={video.id} />
          </ItemGrid>
           <ItemGrid xs={12} sm={12} md={4}>
            <RegularCard
              cardTitle="Informações"
              headerColor="blue"
              style={{ height: '300' }}
              content={
                <DescriptionLiveInput
                  videoId={video.id}
                  description={video.description}
                  script={video.script}
                />
              }
            />
            <RegularCard
              cardTitle="Anexos"
              headerColor="blue"
              style={{ height: '300' }}
              content={
                <Attachments videoId={video.id} />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
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
    script
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
