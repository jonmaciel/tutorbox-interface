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

class ModalNewVideo extends Component {
  state = {
    title: '',
    description: '',
  };

  onCancel = () => {
    this.setState({ title: '' });
    this.setState({ description: '' });
    this.props.closeModal();
  }

  onCreate = () => {
    this.props.mutate({
      variables: {
        title: this.state.title,
        description: this.state.description,
      }
    }).then(({ data }) => {
      this.setState({ title: '' });
      this.setState({ description: '' });
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
        contentLabel="Novo Vídeo"
      >
        <h3 ref={subtitle => this.subtitle = subtitle}>Novo Vídeo</h3>
        <CustomInput
          id="new-comentary"
          labelText="Título do vídeo"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.title,
            onChange: e => this.setState({ title: e.target.value })
          }}
        />
        <CustomInput
          id="new-comentary"
          labelText="Nome da nova organização"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            type: 'text',
            value: this.state.description,
            onChange: e => this.setState({ description: e.target.value })
          }}
        />
        <Button onClick={this.props.closeModal} color="error">Cancel</Button>
        <Button onClick={this.onCreate} color="success">Enviar</Button>
      </Modal>
    )
  }
}


ModalNewVideo.propTypes = {
  data: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  refetchVideos: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation createNewVideo($title: String!, $description: String!) {
    createVideo(
      input: {
        newVideoAttributes: {
          title: $title,
          description: $description,
          system_id: 1,
        }
      }
    ) {
      video { id }
    }
  }`)(ModalNewVideo);
