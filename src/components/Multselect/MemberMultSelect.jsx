import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, withStyles} from 'material-ui';
import { Close } from 'material-ui-icons';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getCurrentOrganizationId } from '../../consts.jsx';
import { tasksStyle } from 'variables/styles';

class MemberMultSelect extends Component {
  state = {
    value: this.props.users
  };

  componentDidMount() {
    this.props.data.refetch();
  };

  selectdIds = () => this.state.value.map(({ id }) => id);

  handleSelectChange = (user, isAdd) => {
    let value = [...this.state.value];
    const currentIds = this.selectdIds();

    if(isAdd) {
      value.push(user)
    } else {
      value = value.filter(({ id }) => id !== user.id)
    }

    const newIds = value.map(({ id }) => id);
    const newMember = newIds.find(x => !currentIds.includes(x));
    const removedMember = currentIds.find(x => !newIds.includes(x));

    this.props.onChange(newMember, removedMember);
    this.setState({ value });
  }

  render () {
    if(this.props.data.loading) return <div />;

    const { data: { selectMembers }, users, classes } = this.props;
    const { value } = this.state;
    const selectedIds = this.selectdIds();
    const options = selectMembers.filter(({id}) => !selectedIds.includes(id))

    return(
      <div>
        {
          value.length > 0 &&
          <div>
            <strong>Membros:</strong>
            <div>
              {
                value.map(user =>
                  <div>
                    {user.name}
                    <IconButton aria-label="Close">
                      <Close
                        className={classes.close}
                        onClick={() => this.handleSelectChange(user, false)}
                      />
                    </IconButton>
                  </div>
                )
              }
            </div>
          </div>
        }
        {
          options.length > 0 &&
          <div>
            <strong>Opções:</strong>
            <div>
              {
                options.map(user => <button onClick={() => this.handleSelectChange(user, true)}>{user.name}</button>)
              }
            </div>
          </div>
        }
      </div>
    )
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
  }
`,
{
  options: props => ({ variables: { organizationId: getCurrentOrganizationId() || props.organizationId } }),
})(withStyles(tasksStyle)(MemberMultSelect));

