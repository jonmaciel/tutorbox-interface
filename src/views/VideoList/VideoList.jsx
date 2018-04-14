import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ButtonNewVideo from './ButtonNewVideo.jsx';
import ButtonModalDelete from './ButtonModalDelete.jsx';
import { isAdmin, isOrganizationAdmin } from '../../consts.jsx';

class VideoList extends Component {
  componentDidMount() {
    this.props.data.refetch();
  }

  render() {
    const { data: { videos, refetch }, error } = this.props;

    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <a href="#" onClick={() => refetch()}>Atualizar</a>
          <RegularCard
            cardTitle="Vídeos"
            headerColor="blue"
            cardSubtitle="Aqui estão seus vídeos em rascunho"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={['Title', 'Sistema', 'Situação', (isAdmin() || isOrganizationAdmin()) && <ButtonNewVideo refetch={refetch}/>]}
                tableData={
                  videos ? videos.map(video => [
                                                 video.title,
                                                 video.system.name,
                                                 video.aasm_state,
                                                 <div>
                                                   <Link to={`/video/${video.id}`}>Editar</Link>
                                                    { isAdmin() && <ButtonModalDelete video={video} refetch={refetch} /> }
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
      system {
        name
      }
    }
  }
`)(VideoList);
