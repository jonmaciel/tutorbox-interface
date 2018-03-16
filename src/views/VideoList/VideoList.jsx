import React from 'react';
import { Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import { RegularCard, Table, ItemGrid } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const VideoList = ({ data: { videos } }) => {
  // debugger;
  return <Grid container>
    <ItemGrid xs={12} sm={12} md={12}>
      <RegularCard
        cardTitle="Vídeos"
        headerColor="blue"
        cardSubtitle="Aqui estão seus vídeos em rascunho"
        content={
          <Table
            tableHeaderColor="primary"
            tableHead={['Title', 'Situação', '']}
            tableData={
              videos ? videos.map(video => [video.title, video.aasm_state, <Link to={`/video/${video.id}`}>Editar</Link>]) : []
            }
          />
        }
      />
    </ItemGrid>
  </Grid>
}

export default graphql(gql`
  { videos { id title aasm_state } } 
`)(VideoList);
