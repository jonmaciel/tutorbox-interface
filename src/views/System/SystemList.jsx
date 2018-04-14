import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SystemNewButton from './SystemNewButton.jsx';
import SystemDeleteButton from './SystemDeleteButton.jsx';
import EditSystemButton from './EditSystemButton.jsx';

class SystemList extends Component {
  render() {
    const { systems, refetchOrganization, organizationId } = this.props;

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Sistemas"
            headerColor="green"
            cardSubtitle="Aqui estão os sistemas dessa organização"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', <SystemNewButton refetch={refetchOrganization} organizationId={organizationId} />]}
                tableData={
                  systems ?
                    systems.map(system => [
                                            system.name,
                                            <div>
                                              <SystemDeleteButton system={system} refetch={refetchOrganization} />
                                              <EditSystemButton system={system} refetch={refetchOrganization} />
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
};

SystemList.propTypes = {
  systems: PropTypes.array,
  refetchOrganizations: PropTypes.func,
  error: PropTypes.object,
};

export default SystemList;