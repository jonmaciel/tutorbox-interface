import React from 'react';
import { RegularCard, Table, ItemGrid, CustomInput, Button, VideoPlayer, TaskList, CommentList} from 'components';
import CancelButton from './Actions/CancelButton.jsx';
import SendRequestButton from './Actions/SendRequestButton.jsx';
import { Grid } from 'material-ui';
import { Player } from 'video-react';

const VideoPlayerContainer = ({ id, title, description, url, aasm_state, refetch}) =>
  <RegularCard
    headerColor="orange"
    cardTitle={title}
    cardSubtitle={
      <div>
        <p>{description}</p>
        <span><strong>Situação: </strong>{aasm_state}</span>
      </div>
    }
    content={
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          {
            url ?
            <div>
              <Player playsInline src={url} />
            </div>
            :
            <div> UPLOAD VIDEO! </div>
          }
        </ItemGrid>
      </Grid>
    }
    footer={
      <div>
        <CancelButton videoId={id} refetchVideo={refetch} />
        <SendRequestButton videoId={id} refetchVideo={refetch} />
      </div>
    }
  />

export default VideoPlayerContainer;