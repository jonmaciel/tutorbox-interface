import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ModalNewVideo from './ModalNewVideo.jsx';
import ModalDeleteVideo from './ModalDeleteVideo.jsx';
import { isAdmin } from '../../consts.jsx';

class VideoList extends Component {
  state = {
    modalDeleteIsOpen: false,
    modalCreateIsOpen: false,
    currentVideo: undefined,
  };

  openCreateModal = () => {
    this.setState({modalCreateIsOpen: true});
  }

  closeCreateModal = () => {
    this.setState({modalCreateIsOpen: false});
  }

  openDeleteModal = (currentVideo) => {
    this.setState({modalDeleteIsOpen: true, currentVideo});
  }

  closeDeleteModal = () => {
    this.setState({ modalDeleteIsOpen: false, currentVideo: undefined });
  }

  render() {
    const { data: { videos, refetch }, error } = this.props;

    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <a href="#" onClick={() => refetch()}>Atualizar</a>
          <ModalNewVideo
            modalIsOpen={this.state.modalCreateIsOpen}
            closeModal={this.closeCreateModal}
            refetchVideos={refetch}
          />
          <ModalDeleteVideo
            modalIsOpen={this.state.modalDeleteIsOpen}
            closeModal={this.closeDeleteModal}
            refetchVideos={refetch}
            video={this.state.currentVideo}
          />
          <RegularCard
            cardTitle="Vídeos"
            headerColor="blue"
            cardSubtitle="Aqui estão seus vídeos em rascunho"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', 'Situação', isAdmin() && <a href="#" onClick={() => this.openCreateModal()}>Novo</a>]}
                tableData={
                  videos ? videos.map(video => [
                                                 video.title,
                                                 video.aasm_state,
                                                 <div>
                                                   <Link to={`/video/${video.id}`}>Editar</Link>
                                                   <a href="#" onClick={ () => this.openDeleteModal(video) }>Delete</a>
                                                 </div>]): []
                }
              />
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}


VideoList.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default graphql(gql`
  {
    videos {
      id
      title
      aasm_state
    }
  }
`, { options: { fetchPolicy: 'cache-and-network'} }
)(VideoList);
