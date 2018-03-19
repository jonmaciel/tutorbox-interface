import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalNewOrganization from './ModalNewOrganization.jsx';
import ModalDeleteOrganization from './ModalDeleteOrganization.jsx';

class OrganizationList extends Component {
  state = {
    modalDeleteIsOpen: false,
    modalCreateIsOpen: false,
    currentOrganization: undefined,
  };

  openCreateModal = () => {
    this.setState({modalCreateIsOpen: true});
  }

  closeCreateModal = () => {
    this.setState({modalCreateIsOpen: false});
  }

  openDeleteModal = (currentOrganization) => {
    this.setState({modalDeleteIsOpen: true, currentOrganization});
  }

  closeDeleteModal = () => {
    this.setState({ modalDeleteIsOpen: false, currentOrganization: undefined });
  }

  render() {
    const { data: { organizations, refetch }, error } = this.props;

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <ModalNewOrganization
            modalIsOpen={this.state.modalCreateIsOpen}
            closeModal={this.closeCreateModal}
            refetchOrganizations={refetch}
          />
          <ModalDeleteOrganization
            modalIsOpen={this.state.modalDeleteIsOpen}
            closeModal={this.closeDeleteModal}
            refetchOrganizations={refetch}
            organization={this.state.currentOrganization}
          />
          <a href="#" onClick={() => refetch()}>Atualizar</a>
          <RegularCard
            cardTitle="Organizations"
            headerColor="blue"
            cardSubtitle="Aqui estão seus vídeos em rascunho"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', <a href="#" onClick={ () => this.openCreateModal() }>Novo</a>]}
                tableData={
                  organizations ?
                    organizations.map(organization => [
                                                organization.name,
                                                <div>
                                                  <Link to={`/organization/${organization.id}`}>Editar</Link>
                                                   <a href="#" onClick={ () => this.openDeleteModal(organization) }>Delete</a>
                                                </div>
                                              ]) :
                    []
                }
              />
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}

OrganizationList.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default graphql(gql`
  {
    organizations {
      id
      name
    }
  }
`)(OrganizationList);
