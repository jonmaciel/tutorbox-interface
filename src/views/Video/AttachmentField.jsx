import React, { Component } from 'react';
import { Button, CustomInput } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';

class AttachmentField extends Component {
  state = {
    file: undefined,
  }

  onChange = ({ target: { validity, files: [file] } }) => {
   validity.valid && this.setState({ file });
  }

  getS3SignedUrl = (file, callback) => {
    const signedUrl = this.props.data.s3SignedUrl
    callback({signedUrl})
  }

  render () {
    const s3SignedUrl = this.props.data.s3SignedUrl
    if(!s3SignedUrl) return <div />
    console.log('URL<<<<<<<<<<<<<<<<', s3SignedUrl)
    return(
      <div>

        <ReactS3Uploader
          getSignedUrl={this.getS3SignedUrl}
          accept="*"
          onProgress={console.log}
          onError={console.log}
          onFinish={console.log}
          contentDisposition="auto"
        />

      </div>
    )
  }
}


AttachmentField.propTypes = {
  videoId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default graphql(gql`
  {
    s3SignedUrl
  }
`)(AttachmentField);
