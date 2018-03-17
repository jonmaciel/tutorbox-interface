import React from 'react';
import { RegularCard } from 'components';
import { Player } from 'video-react';

const VideoPlayer = ({title, description, aasm_state, url}) =>
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
      url ?
      <div>
        <Player playsInline src={url} />
      </div> 
      :
      <div> UPLOAD VIDEO! </div>
    }
  />

export default VideoPlayer;