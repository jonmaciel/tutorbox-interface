import React from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const OrganizationList = ({ data: { organizations, refetch }, error }) =>
  <Grid container>
    <ItemGrid xs={12} sm={12} md={12}>
      <RegularCard
        cardTitle="Organizations"
        headerColor="blue"
        cardSubtitle="Aqui estão seus vídeos em rascunho"
        content={
          <Table
            tableHeaderColor="primary"
            tableHead={['Title', <a href="#" onClick={() => refetch()}>Atualizar</a>]}
            tableData={
              organizations ? organizations.map(user => [user.name, <Link to={`/organization/${user.id}`}>Editar</Link>]) : []
            }
          />
        }
      />
    </ItemGrid>
  </Grid>

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
