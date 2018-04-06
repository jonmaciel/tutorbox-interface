import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { RegularCard, Table, ItemGrid } from 'components';
import CreateUserButton from '../UserModal/CreateUserButton.jsx';
import EditUserButton from '../UserModal/EditUserButton.jsx';
import DeleteUserButton from '../UserModal/DeleteUserButton.jsx';


class UserList extends Component {
  render() {
    const { users, refetchOrganization, organizationId } = this.props;

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Usuários"
            headerColor="green"
            cardSubtitle="Aqui estão os usuários dessa organização"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', <CreateUserButton organizationId={organizationId} refetch={refetchOrganization} />]}
                tableData={
                  users.map(user =>
                    [
                      user.name,
                      <div>
                        <EditUserButton user={user} refetch={refetchOrganization} organizationId={organizationId} />
                        <DeleteUserButton user={user} refetch={refetchOrganization} />
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

export default UserList;