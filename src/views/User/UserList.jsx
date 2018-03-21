import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
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
    const { users, refetch } = this.props;


    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <CreateUserModal
            modalIsOpen={this.state.isModalCreateOpen}
            closeModal={this.closeCreateModal}
            organizationId={this.props.organizationId}
            refetchOrganization={this.props.refetchOrganization}
          />
          { this.state.currentUser &&
            <EditUserModal
              user={this.state.currentUser}
              modalIsOpen={this.state.isModalEditOpen}
              closeModal={this.closeEditModal}
              organizationId={this.props.organizationId}
              refetchOrganization={this.props.refetchOrganization}
            />
          }
          { this.state.currentUser &&
            <DeleteUserModal
              user={this.state.currentUser}
              modalIsOpen={this.state.isModalDeleteOpen}
              closeModal={this.closeDeleteModal}
              refetchOrganization={this.props.refetchOrganization}
            />
          }
          <RegularCard
            cardTitle="Usuários"
            headerColor="green"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', <a href="#" onClick={() => this.openCreateModal()}>Novo</a>]}
                tableData={
                  users.map(user =>
                    [
                      user.name,
                      <div>
                        <a href="#" onClick={ () => this.openEditModal(user) }>Editar</a>
                        <a href="#" onClick={ () => this.openDeleteModal(user) }>Delete</a>
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