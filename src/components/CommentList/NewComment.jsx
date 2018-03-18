import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button } from 'components';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

class NewComment extends Component {
  state = {
    newComment: '',
  };

  onClick() {
    this.props.mutate({
      variables: {
        body: this.state.newComment,
        videoId: this.props.videoId,
      }
    }).then(({ data }) => {
      console.log('got data', data);
      this.setState({ newComment: '' });
      this.props.refetchComments();
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  render () {
    return (
      <div>
        <CustomInput
          id="new-comentary"
          labelText="Novo Comentário"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.newComment,
            onChange: e => this.setState({ newComment: e.target.value })
          }}
         />
        <Button onClick={this.onClick.bind(this)} color="success">Enviar</Button>
      </div>
    )

  }
}


NewComment.propTypes = {
  videoId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(gql`
    mutation postNewComment($body: String!, $videoId: ID!) {
      postComment(
        input: {
          body: $body,
          videoId: $videoId,
          commentDestination: administrative,
        }
      ) {
        comment { id }
      }
    }`, {
  options: ({ videoId }) => ({ variables: { videoId } }),
})(NewComment);
