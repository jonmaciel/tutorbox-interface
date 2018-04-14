import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';
import AttachmentField from './AttachmentField.jsx';

class AddAttachmentButon extends Component {
  saveUpdatedFile = ({ url, name }) =>
      this.props.mutate({
        variables: {
          sourceId: this.props.videoId,
          url,
          name
        },
      }).then(({ data }) => {
        this.props.refetch();
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });


  render () {
    return(
      <div>
        <AttachmentField saveUpdatedFile={this.saveUpdatedFile} />
      </div>
    )
  }
}


AddAttachmentButon.propTypes = {
  videoId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation($sourceId: ID!, $url: String!, $name: String!) {
    createAttachment(
      input: {
        url: $url,
        sourceId: $sourceId,
        name: $name
      }
    ) {
      attachment { id }
    }
  }
`)(AddAttachmentButon);
