import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SelectField from '../SelectField/SelectField.jsx';

const OrganizationSelect = ({ value, onChange, data: { organizations }, error }) =>
  <SelectField
    options={organizations && organizations.map(organization => ({ value: organization.id, label: organization.name }))}
    placeholder="Selecione a organização..."
    onChange={onChange}
    value={value}
  />

export default graphql(gql`
  {
    organizations {
      id
      name
    }
  }
`)(OrganizationSelect);

