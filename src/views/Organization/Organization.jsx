import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import UserList from '../User/UserList.jsx';

class Organization extends Component{
  render(){
    const { data: { organization, refetch }, error } = this.props;
    if (!organization) { return <div/> }

    const { id, name, users, systems } = organization;
    return (
      <div>
       <Link to="/organizations">{"< Voltar para lista de organizações"}</Link>
        <RegularCard
          plainCard
          headerColor="green"
          cardTitle={name}
          content={
            <div>
              <UserList
                organizationId={id}
                refetchOrganization={refetch}
                users={users}
              />
              <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                  <RegularCard
                    cardTitle="Sistemas"
                    headerColor="green"
                    content={
                      <Table
                        tableHeaderColor="primary"
                        tableHead={['Title', <a href="#" onClick={() => refetch()}>Atualizar</a>]}
                        tableData={
                          systems ? systems.map(system => [system.name, <Link to={`/system/${system.id}`}>Editar</Link>]) : []
                        }
                      />
                    }
                  />
                </ItemGrid>
              </Grid>
            </div>
          }
        />
      </div>
    )
  }
}


Organization.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default graphql(gql`
  query($organizationId: ID!) {
    organization(id: $organizationId) {
      id
      name
      users {
        id
        name
        email
      }
      systems {
        id
        name
      }
    }
  }
`, {
  options: (props) => ({ variables: { organizationId: props.match.params.id } }),
})(Organization);
