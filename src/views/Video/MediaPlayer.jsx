import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, ItemGrid, VideoPlayer, TaskList, CommentList, CancelButton, SendRequestButton, SendToProductionButton } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import DescriptionLiveInput from './DescriptionLiveInput.jsx';
import MemberInput from './MemberInput.jsx';
import Attachments from './Attachments.jsx';
import { isScriptWriter } from '../../consts.jsx';
import "../../../node_modules/video-react/dist/video-react.css"

const headerColor = {
  draft: 'orange',
  canceled: 'red',
  script_creation: 'blue',
}

class MediaPlayerIndex extends Component {
  componentDidMount() {
    this.props.data.refetch();
  }

  render() {
    const { data: { video, refetch }, error } = this.props;

    if(error) { return <div>erroooou!</div>  }
    if(!video) { return <div/> }

    const { id, title, tasks, aasm_state, description, script, users, state_verbose, system: { organization } } = video;

    return (
      <div>
        <Link to="/videos">{"< Voltar para lista de vídeos"}</Link>
        <RegularCard
            plainCard
            headerColor={headerColor[aasm_state]}
            cardTitle={
              <div>
                <div style={{float: 'left'}}>
                  <strong>{title}</strong>
                  <div>
                    {state_verbose}
                  </div>
                </div>
                <div style={{float: 'right'}}>
                  { aasm_state === 'draft' && <CancelButton videoId={id} refetchVideo={refetch} /> }
                  { aasm_state === 'draft' && <SendRequestButton disabled={description === ''} videoId={id} refetchVideo={refetch} /> }
                  { aasm_state === 'script_creation' && isScriptWriter() && <SendToProductionButton disabled={script === ''} videoId={id} refetchVideo={refetch} /> }
                </div>
              </div>
            }
            content={
              <Grid container>
                <ItemGrid xs={12} sm={12} md={8}>
                  <VideoPlayer {...video} refetch={refetch} />
                  { false && <TaskList tasks={tasks} /> }
                  <CommentList videoId={id} />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={4}>
                  <MemberInput videoId={id} organizationId={organization.id} users={users} value={users.map(user => user.id)}  />
                  <RegularCard
                    cardTitle="Informações"
                    headerColor="blue"
                    style={{ height: '300' }}
                    content={
                      <DescriptionLiveInput
                        refetch={refetch}
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
        } />
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
    state_verbose
    url
    system {
      organization {
        id
      }
    }
    tasks { id name done }
    users {
      id
      name
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
