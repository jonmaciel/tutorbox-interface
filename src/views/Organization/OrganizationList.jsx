import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalNewOrganization from './ModalNewOrganization.jsx';

class OrganizationList extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { data: { organizations, refetch }, error } = this.props;

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <ModalNewOrganization
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            refetchOrganizations={refetch}
          />
          <a href="#" onClick={() => refetch()}>Atualizar</a>
          <RegularCard
            cardTitle="Organizations"
            headerColor="blue"
            cardSubtitle="Aqui estão seus vídeos em rascunho"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', <a href="#" onClick={ () => this.openModal() }>Novo</a>]}
                tableData={
                  organizations ? organizations.map(user => [user.name, <Link to={`/organization/${user.id}`}>Editar</Link>]) : []
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
