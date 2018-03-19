import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ModalNewVideo from './ModalNewVideo.jsx';

class VideoList extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }


  render() {
    const { data: { videos, refetch }, error } = this.props;

    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <a href="#" onClick={() => refetch()}>Atualizar</a>
          <ModalNewVideo
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            refetchVideos={refetch}
          />
          <RegularCard
            cardTitle="Vídeos"
            headerColor="blue"
            cardSubtitle="Aqui estão seus vídeos em rascunho"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', 'Situação', <a href="#" onClick={() => this.openModal()}>Novo</a>]}
                tableData={
                  videos ? videos.map(video => [video.title, video.aasm_state, <Link to={`/video/${video.id}`}>Editar</Link>]) : []
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
`)(VideoList);
