import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from '../SelectField/SelectField.jsx';
import { RegularCard } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getCurrentOrganizationId } from '../../consts.jsx';

class MemberMultSelect extends Component {
  state = {
    value: this.props.value,
  };

  handleSelectChange = value => {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  }

  render () {
    if(this.props.data.loading) return <div />;

    return (
      <RegularCard
        cardTitle="Equipe"
        headerColor="blue"
        style={{ height: '300' }}
        content={
          <SelectField
            multi
            options={this.props.data.selectMembers.map(member => ({ value: member.id, label: member.name }) )}
            placeholder="Selecione os membros da equipe..."
            onChange={this.handleSelectChange}
            value={this.state.value}
          />
        }
      />
    );
  }
}

MemberMultSelect.propTypes = {
  value: PropTypes.array,
};

export default graphql(gql`
query selectMembers($organizationId: ID!) {
  selectMembers(organizationId: $organizationId) {
    id
    name
  }
}`, {
  options: () => ({ variables: { organizationId: getCurrentOrganizationId() } }),
})(MemberMultSelect);

