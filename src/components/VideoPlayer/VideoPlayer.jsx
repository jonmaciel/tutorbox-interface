import React, { Component } from 'react';
import { RegularCard, ItemGrid, CustomInput } from 'components';
import { Grid } from 'material-ui';
import { Player } from 'video-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { isVideoProducer } from '../../consts.jsx';
import { Button } from 'components';
import AttachmentVideo from './AttachmentVideo.jsx';
import PropTypes from 'prop-types';
import Switch from "react-switch";

class VideoPlayerContainer extends Component {
  state = {
    checked: false,
    newVersion: false,
    videoURL: '',
  }

  onVideoUpdate = ({ url }) => {
    const { newVersion, checked, videoURL } = this.state;

    this.props.mutate({
      variables: {
        id: this.props.id,
        url: checked ? videoURL : url,
        uploadType: checked ? 'url' : 'aws'
      }
    }).then(({ data }) => {
      this.props.refetch();
      this.setState({ newVersion: false })
      console.log('saved');
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    const { id, url, version, aasm_state } = this.props;
    const { newVersion, checked, videoURL } = this.state;

    return (
      <RegularCard
        headerColor="blue"
        cardTitle={
          <div>
            <div style={{float: 'left'}}>
              <strong>Vídeo</strong>
              { version > 0 &&
                <div>
                  Versão: {version}
                </div>
              }
            </div>
            {
              isVideoProducer() && aasm_state === 'production' &&
              <div style={{float: 'right'}}>
              {
                newVersion ?
                <Button color="danger" onClick={ () => this.setState({ newVersion: false }) }>
                  Cancelar Nova Versão
                </Button>
                :
                <Button color="success" onClick={ () => this.setState({ newVersion: true }) }>
                  Nova versão
                </Button>
              }
              </div>
          }
          </div>
        }
        content={
          <Grid container>
            {
              newVersion || !url ?

              <div>
                { isVideoProducer() &&
                  <div>
                    <label htmlFor="material-switch">
                      <span>Colocar sua própria URL</span>
                      <Switch
                        checked={checked}
                        onChange={() => this.setState({ checked: !checked })}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                      />
                    </label>
                    <div>
                      { checked ?
                        <div>
                          <CustomInput
                            id="new-video-url"
                            labelText="URL do Vídeo"
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                              value: videoURL,
                              onChange: e => this.setState({ videoURL: e.target.value })
                            }}
                          />
                          <Button color="success" onClick={this.onVideoUpdate}>
                            enviar
                          </Button>
                        </div>:
                        <AttachmentVideo videoId={id} onVideoUpdate={this.onVideoUpdate} />
                      }
                    </div>
                  </div>
                }
              </div>

              :
              <ItemGrid xs={12} sm={12} md={12}>
                <Player
                  playsInline
                  src={url}
                />
              </ItemGrid>
            }
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
  mutation($id: ID!, $url: String!, $uploadType: VideoUploadTypes!) {
    updateVideo(
      input: {
        id: $id,
        videoAttributes: {
          url: $url,
          upload_type: $uploadType
        }
      }
    ) {
      video { id }
    }
  }
`)(VideoPlayerContainer);
