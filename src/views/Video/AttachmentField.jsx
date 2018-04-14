import React, { Component } from 'react';
import { Button, CustomInput } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';

class AttachmentField extends Component {
  state = {
    name: undefined,
    url: undefined
  };

  getS3SignedUrl = (file, callback) =>
    this.props.data.refetch({ fileType: file.type }).then(r => {
      const signedUrl = r.data.s3SignedUrl.signedUrl;
      this.setState({
        name: file.name,
        url: r.data.s3SignedUrl.fileName,
      })

      callback({ signedUrl });
    })

  onFinish = () => {
    this.props.saveUpdatedFile(this.state);
    this.setState({ name: undefined, url: undefined })
  }

  render () {
    return(
      <ReactS3Uploader
        getSignedUrl={this.getS3SignedUrl}
        accept="*"
        onProgress={console.log}
        onError={console.log}
        onFinish={this.onFinish}
        uploadRequestHeaders={{}}
        contentDisposition="auto"
      />
    )
  }
}


AttachmentField.propTypes = {
  videoId: PropTypes.string.isRequired,
  saveUpdatedFile: PropTypes.func.isRequired,
};

export default graphql(gql`
  query($fileType: String) {
    s3SignedUrl(fileType: $fileType) {
      fileName
      signedUrl
    }
  }
`)(AttachmentField);
