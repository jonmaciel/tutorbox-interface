import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tooltip } from 'material-ui';
import { Button, ConfirmModal } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { tasksStyle } from 'variables/styles';

class AcceptProductionButton extends Component {
  state = {
    modalOpen: false
  }

  onSendToProduction = () => {
    this.props.mutate({
      variables: {
        videoId: this.props.videoId,
      }
    }).then(({ data }) => {
      this.props.refetchVideo();
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  render() {
    const { classes } = this.props;
    return(
      <span>
        <ConfirmModal
          modalIsOpen={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onConfirm={this.onSendToProduction}
        >
          Realmente deseja aceitar a produção desse vídeo?
        </ConfirmModal>
         <Tooltip
          id="tooltip-top"
          title="Aceitar produção"
          placement="top"
          classes={{tooltip: classes.tooltip}}
        >
          <span>
            <Button color="success" onClick={() => this.setState({ modalOpen: true })}>
              Aceitar produção
            </Button>
          </span>
        </Tooltip>
      </span>
    )
  }
}

AcceptProductionButton.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation($videoId: ID!) {
    changeVideoState(
      input: {
        videoId: $videoId,
        event: "accept_production",
      }
    ) {
      success
    }
  }`
)(withStyles(tasksStyle)(AcceptProductionButton));
