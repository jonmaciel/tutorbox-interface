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

class FormUser extends Component {
  state = { name: this.props.name, email: this.props.email };

  onCancel = () => {
    this.setState({ name: '', email: '' });
    this.props.onCancel();
  }

  render () {
    return (
      <div>
        <h3 ref={subtitle => this.subtitle = subtitle}>Novo Usuário</h3>
        <CustomInput
          id="new-comentary"
          labelText="Nome do Usuário"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.name,
            onChange: e => this.setState({ name: e.target.value })
          }}
        />
        <CustomInput
          id="new-comentary"
          labelText="Email do Usuário"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.email,
            onChange: e => this.setState({ email: e.target.value })
          }}
        />
        <Button onClick={this.onCancel} color="error">Cancel</Button>
        <Button onClick={() => this.props.onSubmit(this.state)} color="success">Enviar</Button>
      </div>
    )
  }
}


FormUser.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default FormUser;
