import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SystemModalNew from './SystemModalNew.jsx';
import SystemModalDelete from './SystemModalDelete.jsx';

class SystemList extends Component {
  state = {
    modalDeleteIsOpen: false,
    modalCreateIsOpen: false,
    currentSystem: undefined,
  };

  openCreateModal = () => {
    this.setState({modalCreateIsOpen: true});
  }

  closeCreateModal = () => {
    this.setState({modalCreateIsOpen: false});
  }

  openDeleteModal = (currentSystem) => {
    this.setState({modalDeleteIsOpen: true, currentSystem});
  }

  closeDeleteModal = () => {
    this.setState({ modalDeleteIsOpen: false, currentSystem: undefined });
  }

  render() {
    const { systems, refetchOrganization, organizationId } = this.props;

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <SystemModalNew
            modalIsOpen={this.state.modalCreateIsOpen}
            closeModal={this.closeCreateModal}
            organizationId={organizationId}
            refetchOrganizations={refetchOrganization}
          />
          <SystemModalDelete
            modalIsOpen={this.state.modalDeleteIsOpen}
            closeModal={this.closeDeleteModal}
            refetchOrganizations={refetchOrganization}
            system={this.state.currentSystem}
          />
          <RegularCard
            cardTitle="Organizations"
            headerColor="green"
            cardSubtitle="Aqui estão os systemas dessa organização"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', <a href="#" onClick={ () => this.openCreateModal() }>Novo</a>]}
                tableData={
                  systems ?
                    systems.map(system => [
                                            system.name,
                                            <div>
                                               <a href="#" onClick={ () => this.openDeleteModal(system) }>Delete</a>
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

SystemList.propTypes = {
  systems: PropTypes.array,
  refetchOrganizations: PropTypes.func,
  error: PropTypes.object,
};

export default SystemList;