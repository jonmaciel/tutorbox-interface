import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SystemSelect = ({ value, onChange, data: { organization }, error }) =>
  <select value={value} onChange={onChange}>
    <option value=""></option>
    {
      organization &&
      organization.systems &&
      organization.systems.map(system => <option value={system.id}>{system.name}</option>)
    }
  </select>

export default graphql(gql`
  query($organizationId: ID!) {
    organization(id: $organizationId) {
      id
      systems {
        id
        name
      }
    }
  }
`,
  {
    options: ({ organizationId }) => ({ variables: { organizationId } })
  }
)(SystemSelect);

