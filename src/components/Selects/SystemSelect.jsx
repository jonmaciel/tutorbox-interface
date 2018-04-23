import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SelectField from '../SelectField/SelectField.jsx';

class SystemSelect extends Component {
  componentDidMount() {
    this.props.data.refetch();
  };

  render() {
    const { value, onChange, data, data: { systems }, error } = this.props;

    return (
      <SelectField
        options={systems && systems.map(system => ({ value: system.id, label: system.name }))}
        placeholder="Selecione o sistema..."
        onChange={onChange}
        value={value}
      />
    )
  }
}

export default graphql(gql`
  query systemSelect($organizationId: ID!) {
    systems(organizationId: $organizationId) {
      id
      name
    }
  }
`,
  {
    options: ({ organizationId }) => {
      console.log(organizationId)
      return{ variables: { organizationId } }
    }
  }
)(SystemSelect);

