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

class FormUser extends Component {
  state = {
    name: this.props.name,
    email: this.props.email,
    userRole: this.props.user_role || 'organizationAdmin',
    systemId: this.props.system ? this.props.system.id : ''
  };

  onCancel = () => {
    this.setState({ name: '', email: '', userRole: 'organizationAdmin', systemId: '' });
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
        <div>
          <select value={this.state.userRole} onChange={e => this.setState({ userRole: e.target.value })}>
            <option value="organizationAdmin">Administrador da Organização</option>
            <option value="systemAdmin">Administrador de um sistema</option>
            <option value="systemMember">Membro de um sistema</option>
          </select>
        </div>
        <div>
          {
            this.state.userRole !== 'organizationAdmin' &&
            <SystemSelect
              organizationId={this.props.organizationId}
              value={this.state.systemId}
              onChange={e => this.setState({ systemId: e.target.value })}
            />
          }
        </div>

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
