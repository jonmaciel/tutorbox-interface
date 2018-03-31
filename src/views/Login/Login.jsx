import React from 'react';
import { withStyles, Grid } from 'material-ui'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import {
  RegularCard, Table, ItemGrid, Tasks, CustomInput, Button
} from 'components';
import { AUTH_TOKEN, SIGNUP_REST_URL, getToken, setToken } from '../../consts.jsx';

const customStyles = {
  content : {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 0,
    backgroundColor: 'transparent',
    transform: 'translate(-50%, -50%)'
  }
};

class Login extends React.Component{
  state = {
    email: '',
    password: '',
    isLogged: false
  };

  _login = () =>
    fetch(SIGNUP_REST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    }).then(res => res.json()).then(data => {
        if(data['auth_token']) {
          setToken(data['auth_token']);
          this.props.history.push('/')
        }  else {
          alert(Object.values(data.error).join(','));
        }
      })
// "email":"example@mail.com","password":"123123123"
  render(){
    if(getToken()) {
      this.props.history.push('/')
    }

    return(
      <Modal
        isOpen={true}
        style={customStyles}
      >
        <RegularCard
            headerColor="blue"
            cardTitle="Login"
            content={
            <div>
                <CustomInput
                  labelText="Email"
                  value={this.state.email}
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    onChange: e => this.setState({ email: e.target.value })
                  }}
                />
                <CustomInput
                  labelText="Senha"
                  value={this.state.password}
                  formControlProps={{ fullWidth: true  }}
                  inputProps={{
                    onChange: e => this.setState({ password: e.target.value }),
                    type: "password"
                  }}
                />
                <Button color="success" onClick={this._login}>Enviar</Button>
            </div>
          } />
      </Modal>
    );
  }
}


export default Login;
