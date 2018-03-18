import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button } from 'components';
import { Close } from 'material-ui-icons';
import { IconButton, Tooltip, } from 'material-ui';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class DeleteComment extends Component {
  onClick() {
    this.props.mutate({
      variables: { commentId: this.props.commentId }
    }).then(({ data }) => {
      this.props.refetchComments();
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  render () {
    return (
      <Tooltip
        style={ {float: 'right' } }
        id="tooltip-top-start"
        title="Remove"
        placement="top"
        >
        <IconButton aria-label="Close">
          <Close
            onClick={this.onClick.bind(this)}
          />
        </IconButton>
      </Tooltip>
    )
  }
}


DeleteComment.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(gql`
  mutation deleteComment($commentId: ID!) {
    destroyComment(input: { id: $commentId }) {
      success
    }
  }`, {
  options: ({ videoId }) => ({ variables: { videoId } }),
})(DeleteComment);
