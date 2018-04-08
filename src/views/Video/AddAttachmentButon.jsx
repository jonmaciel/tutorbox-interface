import React, { Component } from 'react';
import { Button } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class AddAttachmentButon extends Component {
  state = {
    description: this.props.description,
    script: this.props.script,
  }

  addAttachment = () => {
    this.props.mutate({
      variables: {
        sourceId: this.props.videoId,
        url: 'test/teste'
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return <Button onClick={this.addAttachment} color="success">+</Button>
  }
}


AddAttachmentButon.propTypes = {
  videoId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation($sourceId: ID!, $url: String!) {
    createAttachment(
      input: {
        url: $url,
        sourceId: $sourceId
      }
    ) {
      attachment { id }
    }
  }
`)(AddAttachmentButon);
