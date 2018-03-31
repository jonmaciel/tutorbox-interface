import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button, SystemSelect } from 'components';
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

class FormTutormaker extends Component {
  state = {
    name: this.props.name,
    email: this.props.email,
    userRole: this.props.user_role || 'admin',
    password: '',
    passwordConfirmation: ''
  };

  onCancel = () => {
    this.setState({ name: '', email: '', userRole: 'admin',  password: '', passwordConfirmation: ''});
    this.props.onCancel();
  }

  render () {
    return (
      <div>
        <h3 ref={subtitle => this.subtitle = subtitle}>Novo Tutormaker</h3>
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

        <div>
          <select value={this.state.userRole} onChange={e => this.setState({ userRole: e.target.value })}>
            <option value="admin">Administrador Geral</option>
            <option value="videoProducer">Produtor de vídeos</option>
            <option value="scriptWriter">Roteirista</option>
          </select>
        </div>

        <CustomInput
          id="new-comentary"
          labelText="Senha"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.password,
            type: 'password',
            onChange: e => this.setState({ password: e.target.value })
          }}
        />

        <CustomInput
          id="new-comentary"
          labelText="Confirmação da senha"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.passwordConfirmation,
            type: 'password',
            onChange: e => this.setState({ passwordConfirmation: e.target.value })
          }}
        />

        <Button onClick={this.onCancel} color="error">Cancel</Button>
        <Button onClick={() => this.props.onSubmit(this.state)} color="success">Enviar</Button>
      </div>
    )
  }
}


FormTutormaker.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default FormTutormaker;
