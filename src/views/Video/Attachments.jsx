import React, { Component } from 'react';
import {  TaskList, CommentList, VideoSidebar } from 'components';
import "../../../node_modules/video-react/dist/video-react.css"
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import DescriptionLiveInput from './DescriptionLiveInput.jsx';
import AddAttachmentButon from './AddAttachmentButon.jsx';
import RemoveAttachmentButon from './RemoveAttachmentButon.jsx';

class Attachments extends Component {
  render() {
    const { data: { attachments, refetch }, error } = this.props;

    if(error) { return <div>erroooou!</div>  }
    if(!attachments) { return <div/> }
    return (
      <div>
        {attachments.map(({id, url, name}) =>
          <div>
            <a target="_blank" key={id} href={url} download>{name}</a>
            <RemoveAttachmentButon attachmentId={id} refetch={refetch} />
          </div>
        )}
        <AddAttachmentButon videoId={this.props.videoId} refetch={refetch} />
      </div>
    );
  }
}

Attachments.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default graphql(gql`
query($videoId: ID!) {
  attachments(videoId: $videoId) {
    id
    name
    url
  }
}`,{
  options: (props) => ({ variables: { videoId: props.videoId } }),
})(Attachments);
