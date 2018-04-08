import React, { Component } from 'react';
import { ConfirmModal, CustomInput, Button } from 'components';
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

class ButtonNewVideo extends Component {
  state = {
    title: '',
    description: '',
    modalOpen: false
  };

  onCancel = () => {
    this.setState({
      title: '',
      description: '',
      modalOpen: false
    });
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
      this.props.refetch();
      this.onCancel();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return (
      <div>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={this.onCancel}
          onConfirm={this.onCreate}
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
            labelText="Descrição do vídeo"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              type: 'text',
              value: this.state.description,
              multiline: true,
              rows: 5,
              onChange: e => this.setState({ description: e.target.value })
            }}
          />
        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>Novo</a>
      </div>
    )
  }
}


ButtonNewVideo.propTypes = {
  refetch: PropTypes.func.isRequired,
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
  }`)(ButtonNewVideo);
