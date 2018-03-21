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

class NewOrganization extends Component {
  state = {
    name: '',
  };

  onCancel = () => {
    this.setState({ name: '' })
    this.props.closeModal();
  }

  onCreate = () => {
    this.props.mutate({
      variables: {
        name: this.state.name,
        organizationId: this.props.organizationId,
      }
    }).then(({ data }) => {
      this.setState({ name: '' });
      this.props.refetchOrganizations();
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
        contentLabel="Nova Organização"
      >
        <h3 ref={subtitle => this.subtitle = subtitle}>Novo Sistema</h3>
        <CustomInput
          id="new-comentary"
          labelText="Nome da nova organização"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.name,
            onChange: e => this.setState({ name: e.target.value })
          }}
        />
        <Button onClick={this.props.closeModal} color="error">Cancel</Button>
        <Button onClick={this.onCreate} color="success">Enviar</Button>
      </Modal>
    )
  }
}


NewOrganization.propTypes = {
  data: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation createNewSystem($name: String!, $organizationId: ID!) {
    createSystem(
      input: {
        newSystemAttributes: {
          name: $name,
          organization_id: $organizationId,
        }
      }
    ) {
      system { id }
    }
  }`)(NewOrganization);
