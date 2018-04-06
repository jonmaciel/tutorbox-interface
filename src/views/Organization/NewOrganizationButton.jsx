import React, { Component } from 'react';
import { CustomInput, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

class NewOrganizationButton extends Component {
  state = {
    name: '',
    modalOpen: false
  };

  onCancel = () => {
    this.setState({ name: '' })
    this.props.closeModal();
  }

  onCreate = () => {
    this.props.mutate({
      variables: {
        name: this.state.name,
      }
    }).then(({ data }) => {
      this.setState({ name: '' });
      this.props.refetch();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return (
      <div>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onCreate}
        >
          <h3 ref={subtitle => this.subtitle = subtitle}>Nova Organização</h3>
          <CustomInput
            id="new-comentary"
            labelText="Nome da nova organização"
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


NewOrganizationButton.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation($name: String!) {
    createOrganization(
      input: {
        newOrganizationAttributes: {
          name: $name
        }
      }
    ) {
      organization { id }
    }
  }`)(NewOrganizationButton);
