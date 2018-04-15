import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, ItemGrid, VideoPlayer, TaskList, CommentList } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import DescriptionLiveInput from './DescriptionLiveInput.jsx';
import MemberInput from './MemberInput.jsx';
import Attachments from './Attachments.jsx';
import "../../../node_modules/video-react/dist/video-react.css"

class MediaPlayerIndex extends Component {
  render() {
    const { data: { video, refetch }, error } = this.props;

    if(error) { return <div>erroooou!</div>  }
    if(!video) { return <div/> }

    const { id, tasks, description, script, users } = video;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <Link to="/videos">{"< Voltar para lista de vídeos"}</Link>
            <VideoPlayer {...video} refetch={refetch} />
            <TaskList tasks={tasks} />
            <CommentList videoId={id} />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <MemberInput videoId={id} value={users.map(user => user.id)}  />
            <RegularCard
              cardTitle="Informações"
              headerColor="blue"
              style={{ height: '300' }}
              content={
                <DescriptionLiveInput
                  videoId={id}
                  description={description}
                  script={script}
                />
              }
            />
            <RegularCard
              cardTitle="Anexos"
              headerColor="blue"
              style={{ height: '300' }}
              content={
                <Attachments videoId={id} />
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
    users {
      id
    }
    comments {
      id
      body
      author { name }
    }
  }
}`,{
  options: (props) => ({ variables: { videoId: props.match.params.id } }),
})(MediaPlayerIndex);
