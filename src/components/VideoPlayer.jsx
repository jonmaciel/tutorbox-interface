import React from 'react';
import { RegularCard, Table, ItemGrid, CustomInput, Button, VideoPlayer, TaskList, CommentList} from 'components';
import { Grid } from 'material-ui';
import { Player } from 'video-react';

const VideoPlayerContainer = ({title, description, url, aasm_state}) =>
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
        <Button color="danger" onClick={() => {}}>Cancelar Vídeo</Button>
        <Button color="success" onClick={() => {}}>Enviar requisoção</Button>
      </div>
    }
  />

export default VideoPlayerContainer;