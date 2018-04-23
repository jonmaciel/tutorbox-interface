import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from '../SelectField/SelectField.jsx';
import { RegularCard } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getCurrentOrganizationId, isVideoProducer } from '../../consts.jsx';

class MemberMultSelect extends Component {
  state = {
    value: this.props.value || '',
  };

  componentDidMount() {
    this.props.data.refetch();
  };

  handleSelectChange = value => {
    const newValues = value.split(',')
    const oldValues = this.state.value.split(',')

    const newMember = newValues.find(x => !oldValues.includes(x));
    const removedMember = oldValues.find(x => !newValues.includes(x));

    this.props.onChange(newMember, removedMember);
    this.setState({ value });
  }

  render () {
    if(this.props.data.loading) return <div />;

    const { data: { selectMembers }, users } = this.props;

    return (
      <SelectField
        multi
        readOnly={isVideoProducer()}
        options={(selectMembers ? selectMembers : users).map(member => ({ value: member.id, label: member.name }) )}
        placeholder="Selecione os membros da equipe..."
        onChange={this.handleSelectChange}
        value={this.state.value}
      />
    );
  }
}

MemberMultSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default graphql(gql`
query selectMembers($organizationId: ID!) {
  selectMembers(organizationId: $organizationId) {
    id
    name
  }
}`,
{
  options: props => ({ variables: { organizationId: getCurrentOrganizationId() || props.organizationId } }),
})(MemberMultSelect);

