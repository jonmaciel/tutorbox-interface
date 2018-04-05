import React, { Component } from 'react';
import { CustomInput, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

class SystemNewButton extends Component {
  state = {
    name: '',
    modalOpen: false
  };

  onCancel = () => this.setState({ name: '', modalOpen: false});

  onCreate = () =>
    this.props.mutate({
      variables: {
        name: this.state.name,
        organizationId: this.props.organizationId,
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
          <h3 ref={subtitle => this.subtitle = subtitle}>Novo Sistema</h3>
          <CustomInput
            id="new-comentary"
            labelText="Nome do novo systema"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              value: this.state.name,
              onChange: e => this.setState({ name: e.target.value })
            }}
          />
        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>
          Novo
        </a>
      </div>
    )
  }
}


SystemNewButton.propTypes = {
  refetch: PropTypes.func.isRequired,
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
  }`)(SystemNewButton);
