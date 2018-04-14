import React, { Component } from 'react';
import { ConfirmModal, CustomInput, Button, OrganizationSelect, SystemSelect } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import { isOrganizationAdmin, getCurrentOrganizationId } from '../../consts.jsx';

class ButtonNewVideo extends Component {
  state = {
    title: '',
    description: '',
    modalOpen: false,
    systemId: '',
    organizationId: '',
  };

  onCancel = () => {
    this.setState({
      title: '',
      description: '',
      systemId: '',
      organizationId: '',
      modalOpen: false
    });
  }

  onCreate = () =>
    this.props.mutate({
      variables: {
        title: this.state.title,
        description: this.state.description,
        systemId: this.state.systemId
      }
    }).then(({ data }) => {
      this.setState({ title: '', description: '' });
      this.props.refetch();
      this.onCancel();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );

  render () {
    const organizationId = isOrganizationAdmin() ? getCurrentOrganizationId() : this.state.organizationId;

    return (
      <div>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={this.onCancel}
          onConfirm={this.onCreate}
        >
          <h3 ref={subtitle => this.subtitle = subtitle}>Novo Vídeo</h3>
          <CustomInput
            id="new-comentary"
            labelText="Título do vídeo"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              value: this.state.title,
              onChange: e => this.setState({ title: e.target.value })
            }}
          />
          <CustomInput
            id="new-comentary"
            labelText="Descrição do vídeo"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              type: 'text',
              value: this.state.description,
              multiline: true,
              rows: 5,
              onChange: e => this.setState({ description: e.target.value })
            }}
          />

          <div>
            {
            !isOrganizationAdmin() && <OrganizationSelect
                value={organizationId}
                onChange={e => this.setState({ organizationId: e.target.value })}
              />
            }
          </div>

          <SystemSelect
            organizationId={organizationId}
            value={this.state.systemId}
            onChange={e => this.setState({ systemId: e.target.value })}
          />

        </ConfirmModal>
        <a href="#" onClick={ () => this.setState({ modalOpen: true }) }>Novo</a>
      </div>
    )
  }
}


ButtonNewVideo.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation createNewVideo($title: String!, $description: String!, $systemId: ID!) {
    createVideo(
      input: {
        newVideoAttributes: {
          title: $title,
          description: $description,
          system_id: $systemId,
        }
      }
    ) {
      video { id }
    }
  }`)(ButtonNewVideo);
