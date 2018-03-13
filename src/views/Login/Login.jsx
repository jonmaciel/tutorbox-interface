import React from 'react';
import { withStyles, Grid } from 'material-ui'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  RegularCard, Table, ItemGrid, Tasks, CustomInput, Button
} from 'components';

const AUTH_TOKEN = 'auth-token';
const SIGNUP_REST_URL = 'http://localhost:3000/authenticate'

// # curl -H "Content-Type: application/json" -X POST -d '{"email":"example@mail.com","password":"123123123"}' 
class Login extends React.Component{
  state = {
    email: '',
    password: '',
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  _confirm = async () => {
  // ... you'll implement this in a bit
  }

  _login = () => {
    fetch(SIGNUP_REST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: this.state.email, 
        password: this.state.password 
      }),
    }).then(res => res.json()).then(data => { if(data['auth_token']) this._saveUserData(data['auth_token']) } )
  }

  render(){
    return(
      <RegularCard
          headerColor="blue"
          cardTitle="Login"
          content={
          <div>
              <CustomInput
                labelText="Email"
                value={this.state.email}
                inputProps={ { onChange: e => this.setState({ email: e.target.value }) } }
                formControlProps={{ fullWidth: true }}
              />
              <CustomInput
                labelText="Senha"
                inputProps={ { onChange: e => this.setState({ password: e.target.value }) } }
                value={this.state.password}
                formControlProps={{ fullWidth: true  }}
              />
              <Button color="success" onClick={this._login}>Enviar</Button>
          </div>
        } />
    );
  }
}


export default Login;
