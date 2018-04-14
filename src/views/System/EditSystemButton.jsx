import React, { Component } from 'react';
import { CustomInput, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

class EditSystemButton extends Component {
  state = {
    name: this.props.system.name,
    modalOpen: false
  };

  onCancel = () => this.setState({ modalOpen: false});

  onCreate = () =>
    this.props.mutate({
      variables: {
        id: this.props.system.id,
        name: this.state.name,
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );

  render () {
    return (
      <div>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={this.onCancel}
          onConfirm={this.onCreate}
        >
          <h3 ref={subtitle => this.subtitle = subtitle}>Editar Sistema</h3>
          <CustomInput
            id="new-comentary"
            labelText="Novo nome para o systema"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              value: this.state.name,
              onChange: e => this.setState({ name: e.target.value })
            }}
          />
        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>
          Edit
        </a>
      </div>
    )
  }
};

EditSystemButton.propTypes = {
  refetch: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation ($id: ID!, $name: String!) {
    updateSystem(
      input: {
        id: $id,
        systemAttributes: {
          name: $name
        }
      }
    ) {
      system { id }
    }
  }`)(EditSystemButton);
