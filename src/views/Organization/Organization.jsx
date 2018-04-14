import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import UserList from '../User/UserList.jsx';
import SystemList from '../System/SystemList.jsx';

class Organization extends Component{
  componentDidMount() {
    this.props.data.refetch();
  }

  render(){
    const { data: { organization, refetch }, error } = this.props;
    if (!organization) { return <div/> }

    const { id, name, users, systems } = organization;
    return (
      <div>
       {!this.props.organizationId && <Link to="/organizations">{"< Voltar para lista de organizações"}</Link>}
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
              <SystemList
                organizationId={id}
                refetchOrganization={refetch}
                systems={systems}
              />
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
        system { id }
        user_role
      }
      systems {
        id
        name
      }
    }
  }
`, {
  options: (props) => ({ variables: { organizationId: props.organizationId || props.match.params.id } }),
})(Organization);
