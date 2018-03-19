import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button } from 'components';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class DeleteVideo extends Component {
  onCancel = () => {
    this.props.closeModal();
  }

  onCreate = () => {
    this.props.mutate({
      variables: {
        id: this.props.video.id,
      }
    }).then(({ data }) => {
      this.props.refetchVideos();
      this.onCancel();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.props.afterOpenModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Deletar Organização"
      >
        {
          this.props.video ?
          <div>
            <h4 ref={subtitle => this.subtitle = subtitle}>
              Você tem certeza que deseja deletar deletar o vídeo
              <strong> {this.props.video.title} </strong>
              ?
            </h4>
            <Button onClick={this.props.closeModal} color="error">Cancel</Button>
            <Button onClick={this.onCreate} color="success">Deletar</Button>
          </div>:
          <div />
        }
      </Modal>
    )
  }
}


DeleteVideo.propTypes = {
  data: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  refetchVideos: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation deleteVideo($id: ID!) {
    destroyVideo(
      input: {
        id: $id,
      }
    ) {
      success
    }
  }`)(DeleteVideo);
