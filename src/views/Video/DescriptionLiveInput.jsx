import React, { Component } from 'react';
import { CustomInput } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { isVideoProducer } from '../../consts.jsx';

class DescriptionLiveInput extends Component {
  state = {
    description: this.props.description,
    script: this.props.script,
  }

  onBlur = () => {
    this.props.mutate({
      variables: {
        id: this.props.videoId,
        description: this.state.description,
        script: this.state.script,
      }
    }).then(({ data }) => {
      console.log('saved');
    }).catch((error) =>{
        console.log('there was an error sending the query', error);
      }
    );
  }

  render () {
    return (
      <div>
        <CustomInput
          id="new-comentary"
          labelText="Descrição do vídeo"
          formControlProps={{ fullWidth: true }}
          inputProps={{
            value: this.state.description,
            onBlur: this.onBlur,
            multiline: true,
            rows: 5,
            onChange: e => this.setState({ description: e.target.value })
          }}
        />
        {
          isVideoProducer() &&
          <CustomInput
            id="new-comentary"
            labelText="Roteiro do vídeo"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              value: this.state.script,
              onBlur: this.onBlur,
              multiline: true,
              rows: 5,
              onChange: e => this.setState({ script: e.target.value })
            }}
          />
        }
      </div>
    )
  }
}


DescriptionLiveInput.propTypes = {
  videoId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
};

export default graphql(gql`
  mutation($id: ID!, $description: String, $script: String) {
    updateVideo(
      input: {
        id: $id,
        videoAttributes: {
          description: $description,
          script: $script,
        }
      }
    ) {
      video { id }
    }
  }
`)(DescriptionLiveInput);
