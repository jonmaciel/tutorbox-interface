import React, { Component } from 'react';
import { Button } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class RemoveAttachmentButon extends Component {
  state = {
    description: this.props.description,
    script: this.props.script,
  }

  removeAttachment = () => {
    this.props.mutate({
      variables: {
        id: this.props.attachmentId,
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return <Button onClick={this.removeAttachment} color="danger">-</Button>
  }
}


RemoveAttachmentButon.propTypes = {
  attachmentId: PropTypes.string.isRequired,
};

export default graphql(gql`
  mutation($id: ID!) {
    destroyAttachment(
      input: {
        id: $id
      }
    ) {
      success
    }
  }
`)(RemoveAttachmentButon);
