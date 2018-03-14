import React, { Component } from 'react';
import {
  Grid,
  withStyles,
  Typography
} from 'material-ui';
import { Link } from 'react-router-dom';
import {
  RegularCard, Table, ItemGrid, Tasks, CustomInput, Button
} from 'components';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css"
import { P } from 'components';
const style = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
}

class MediaPlayerIndex extends Component {
  render() {
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <Link to="/videos">{"< Voltar para lista de vídeos"}</Link>
        <RegularCard
          headerColor="orange"
          cardTitle="Vídeo 1"
          cardSubtitle={<div>
            <p>Vídeo de amostra para o novo lançamento</p>
            <span><strong>Situação:</strong> Rascunho</span>
          </div>}
          content={
            <div>
            <Player playsInline src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            </div>
          }
        />
        <RegularCard
          headerColor="green"
          cardTitle="Tarefas"
          content={
          <Typography component="div">
            <Tasks
              checkedIndexes={[0,2]}
              tasksIndexes={[0,1,2]}
              tasks={["Iniciar o vídeo com montanhas e muita neve",
                  "Cena de aprendizagem no acampamento",
                  "Colocar cenas das batalhas épicas"
                  ]}
            />
          </Typography>
        } />
        <RegularCard
          headerColor="green"
          cardTitle="Comentários"
          content={
          <div>
            <div className={this.props.classes.typo}>
              <div className={this.props.classes.note}>
                Cliente
              </div>
              <P>Queria que mudasse as cores em 12:30</P>
            </div>
            <div className={this.props.classes.typo}>
              <div className={this.props.classes.note}>
                Freelancer
              </div>
              <P>Mudança realizada</P>
            </div>
            <div>
              <CustomInput
                labelText="Novo Comentário"
                id="new-comentary"
                formControlProps={{
                  fullWidth: true
                }}
              />
              <Button color="success">Enviar</Button>
            </div>
          </div>
        } />
      </ItemGrid>
    </Grid>
  );
  }
}
export default withStyles(style)(MediaPlayerIndex);