import React from 'react';
import { withStyles, Grid } from 'material-ui'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  RegularCard, Table, ItemGrid, Tasks, CustomInput, Button
} from 'components';
import { AUTH_TOKEN, SIGNUP_REST_URL, getToken, setToken } from '../../consts.jsx';

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
              <Button color="success" onClick={() => { alert(localStorage.getItem(AUTH_TOKEN)) }}>See it</Button>
          </div>
        } />
    );
  }
}


export default Login;
