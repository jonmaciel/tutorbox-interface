import React, { Component } from 'react';
import { CustomInput, ConfirmModal, SystemSelect, RoleSelect } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

class FormUser extends Component {
  state = {
    name: this.props.name,
    email: this.props.email,
    userRole: this.props.user_role || 'admin',
    systemId: (this.props.system && this.props.system.id) || '',
    password: '',
    passwordConfirmation: '',
    organizationId: this.props.organizationId,
  }

  handleCancel = () => {
    this.setState({ name: '', email: '', userRole: 'admin',  password: '', passwordConfirmation: '', systemId: ''});
    this.props.onCancel();
  }

  render () {
    const { isTutormaker } = this.props;
    return (
      <ConfirmModal
        modalIsOpen={this.props.modalOpen}
        onClose={this.handleCancel}
        onConfirm={() => this.props.onSubmit(this.state)}
      >
        <h3 ref={subtitle => this.subtitle = subtitle}>{this.props.title || 'Novo Tutormaker'}</h3>
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
          <RoleSelect
            isTutormaker={isTutormaker}
            value={this.state.userRole}
            onChange={userRole => this.setState({ userRole })}
          />
        </div>

        <div>
          {
            ['systemAdmin', 'systemMember'].includes(this.state.userRole) &&
              <SystemSelect
                organizationId={this.props.organizationId}
                value={this.state.systemId}
                onChange={systemId => this.setState({ systemId })}
              />
          }
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
      </ConfirmModal>
    )
  }
}


FormUser.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isTutormaker: PropTypes.bool.isRequired,
};

export default FormUser;
