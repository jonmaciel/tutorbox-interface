import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const OrganizationSelect = ({ value, onChange, data: { organizations }, error }) =>
  <select value={value} onChange={onChange}>
    <option value=""></option>
    {
      organizations.map(organization => <option value={organization.id}>{organization.name}</option>)
    }
  </select>

export default graphql(gql`
  {
    organizations {
      id
      name
    }
  }
`)(OrganizationSelect);

