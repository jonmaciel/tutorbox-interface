import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';

class AttachmentVideo extends Component {
  state = {
    name: undefined,
    url: undefined
  };

  gets3SignedUrlVideo = (file, callback) =>
    this.props.data.refetch({ fileType: file.type }).then(r => {
      const signedUrl = r.data.s3SignedUrlVideo.signedUrl;
      this.setState({
        name: file.name,
        url: r.data.s3SignedUrlVideo.fileName,
      })

      callback({ signedUrl });
    })

  onFinish = () => {
    this.props.onVideoUpdate(this.state);
    this.setState({ name: undefined, url: undefined })
  }

  render () {
    return(
      <ReactS3Uploader
        getSignedUrl={this.gets3SignedUrlVideo}
        accept="video/*"
        onProgress={console.log}
        onError={console.log}
        onFinish={this.onFinish}
        uploadRequestHeaders={{}}
        contentDisposition="auto"
      />
    )
  }
}

AttachmentVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  onVideoUpdate: PropTypes.func.isRequired,
};

export default graphql(gql`
  query($fileType: String, $videoId: ID!) {
    s3SignedUrlVideo(fileType: $fileType, videoId: $videoId) {
      fileName
      signedUrl
    }
  }
`, {
   options: (props) => ({ variables: { videoId: props.videoId } }),
})(AttachmentVideo);
