import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CreateUserButton from '../UserModal/CreateUserButton.jsx';
import EditUserButton from '../UserModal/EditUserButton.jsx';
import DeleteUserButton from '../UserModal/DeleteUserButton.jsx';

class UserList extends Component {
  render() {
    const { data: { tutormakers, refetch }, error, organizationId } = this.props;

    if (!tutormakers) { return <div />  }

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Tutormakers"
            headerColor="blue"
            cardSubtitle="Esssa é a lista de Tutormakers"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', 'Papel', <CreateUserButton isTutormaker={true} organizationId={organizationId} refetch={refetch} />]}
                tableData={
                  tutormakers.map(tutormaker =>
                    [
                      tutormaker.name,
                      tutormaker.user_role,
                      <div>
                        <EditUserButton isTutormaker={true} user={tutormaker} refetch={refetch} organizationId={organizationId} />
                        <DeleteUserButton user={tutormaker} refetch={refetch} />
                      </div>
                    ])
                }
              />
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}

export default graphql(gql`
  {
    tutormakers {
      id
      user_role
      name
      email
    }
  }
`)(UserList);