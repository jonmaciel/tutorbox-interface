import React, { Component } from 'react';
import { Button, CustomInput } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';

class AddAttachmentButon extends Component {
  state = {
    file: undefined,
  }


  addAttachment = () => {
    const file = this.state.file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    const mutate = this.props.mutate;
    const refetch = this.props.refetch;
    const videoId = this.props.videoId;

    reader.onload = function () {
      mutate({
        variables: {
          sourceId: videoId,
          url: 'test/teste',
          file: reader.result
        },
      }).then(({ data }) => {
        refetch();
      }).catch((error) =>{
          console.log('there was an error sending the query', error);
        }
      );
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render () {
    return(
      <div>
        <CustomInput
          id="new-comentary"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.description,
            onBlur: this.onBlur,
            type: 'file',
            onChange: ({ target: { validity, files: [file] } }) => validity.valid && this.setState({ file })
          }}
        />
        <Button onClick={this.addAttachment} color="success">+</Button>
      </div>
    )
  }
}


AddAttachmentButon.propTypes = {
  videoId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default graphql(gql`
  mutation($sourceId: ID!, $url: String!, $file: String!) {
    createAttachment(
      input: {
        url: $url,
        sourceId: $sourceId,
        file: $file
      }
    ) {
      attachment { id }
    }
  }
`)(AddAttachmentButon);
