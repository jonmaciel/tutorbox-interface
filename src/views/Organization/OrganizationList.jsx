import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import NewOrganizationButton from './NewOrganizationButton.jsx';
import DeleteOrganizationButton from './DeleteOrganizationButton.jsx';

class OrganizationList extends Component {
  componentDidMount() {
    this.props.data.refetch();
  }

  render() {
    const { data: { organizations, refetch }, error } = this.props;

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <a href="#" onClick={() => refetch()}>Atualizar</a>
          <RegularCard
            cardTitle="Organizações"
            headerColor="blue"
            cardSubtitle="Aqui estão as organizações cadastradas no sistema"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', <NewOrganizationButton refetch={refetch} />]}
                tableData={
                  organizations ?
                    organizations.map(organization => [
                                                organization.name,
                                                <div>
                                                  <Link to={`/organization/${organization.id}`}>Editar</Link>
                                                   <DeleteOrganizationButton organization= {organization} refetch={refetch} />
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
