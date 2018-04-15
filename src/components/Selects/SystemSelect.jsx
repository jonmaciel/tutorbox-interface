import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SelectField from '../SelectField/SelectField.jsx';

const SystemSelect = ({ value, onChange, data: { organization }, error }) =>
  <SelectField
    options={
      organization &&
      organization.systems &&
      organization.systems.map(system => ({ value: system.id, label: system.name }))}
    placeholder="Selecione a organização..."
    onChange={onChange}
    value={value}
  />

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

