import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CreateUserModal from './CreateUserModal.jsx';
import EditUserModal from './EditUserModal.jsx';
import DeleteUserModal from './DeleteUserModal.jsx';

class UserList extends Component {
  state = {
    isModalDeleteOpen: false,
    isModalCreateOpen: false,
    isModalEditOpen: false,
    currentUser: undefined,
  };

  openCreateModal = () => {
    this.setState({isModalCreateOpen: true});
  }

  closeCreateModal = () => {
    this.setState({isModalCreateOpen: false});
  }

  openEditModal = (currentUser) => {
    this.setState({isModalEditOpen: true, currentUser});
  }

  closeEditModal = () => {
    this.setState({ isModalEditOpen: false, currentUser: undefined });
  }

  openDeleteModal = (currentUser) => {
    this.setState({isModalDeleteOpen: true, currentUser});
  }

  closeDeleteModal = () => {
    this.setState({ isModalDeleteOpen: false, currentUser: undefined });
  }

  render() {
    const { data: { tutormakers, refetch }, error } = this.props;

    if (!tutormakers) { return <div />  }

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <CreateUserModal
            modalIsOpen={this.state.isModalCreateOpen}
            closeModal={this.closeCreateModal}
            organizationId={this.props.organizationId}
            refetch={refetch}
          />
          { this.state.currentUser &&
            <EditUserModal
              user={this.state.currentUser}
              modalIsOpen={this.state.isModalEditOpen}
              closeModal={this.closeEditModal}
              organizationId={this.props.organizationId}
              refetch={refetch}
            />
          }
          { this.state.currentUser &&
            <DeleteUserModal
              user={this.state.currentUser}
              modalIsOpen={this.state.isModalDeleteOpen}
              closeModal={this.closeDeleteModal}
              refetch={refetch}
            />
          }
          <RegularCard
            cardTitle="Tutormakers"
            headerColor="blue"
            cardSubtitle="Esssa é a lista de Tutormakers"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', 'Papel', <a href="#" onClick={() => this.openCreateModal()}>Novo</a>]}
                tableData={
                  tutormakers.map(tutormaker =>
                    [
                      tutormaker.name,
                      tutormaker.user_role,
                      <div>
                        <a href="#" onClick={ () => this.openEditModal(tutormaker) }>Editar</a>
                        <a href="#" onClick={ () => this.openDeleteModal(tutormaker) }>Delete</a>
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