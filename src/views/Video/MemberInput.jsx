import React, { Component } from 'react';
import { RegularCard, MemberMultSelect } from 'components';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class DescriptionLiveInput extends Component {
  state = {
    description: this.props.description,
    script: this.props.script,
  }

  onChange = (newMember, removedMember) => {
    if(newMember)
      this.props.assignVideo({
        variables: {
          videoId: this.props.videoId,
          userId: newMember,
        }
      }).then(({ data }) => {
        console.log('saved');
      }).catch((error) =>{
          console.log('there was an error sending the query', error);
        }
      );

    if(removedMember)
      this.props.unassignVideo({
        variables: {
          videoId: this.props.videoId,
          userId: removedMember,
        }
      }).then(({ data }) => {
        console.log('saved');
      }).catch((error) =>{
          console.log('there was an error sending the query', error);
        }
      );
  }

  render () {
    const { organizationId, users } = this.props;
    return (
      <RegularCard
        cardTitle="Equipe"
        headerColor="blue"
        style={{ height: '300' }}
        content={
          <MemberMultSelect value={this.props.value.join(',')}  organizationId={organizationId} users={users} onChange={this.onChange} />
        }
      />
    )
  }
}


DescriptionLiveInput.propTypes = {
  videoId: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  script: PropTypes.string.isRequired,
};

export default compose(
  graphql(
    gql`
      mutation assignVideo($userId: ID!, $videoId: ID!) {
        assignVideo(
          input: {
            userId: $userId,
            videoId: $videoId
          }
        ) { success }
      }
    `,
    {
      name: 'assignVideo'
    }
  )
,
graphql(
  gql`
    mutation unassignVideo($userId: ID!, $videoId: ID!) {
      unassignVideo(
        input: {
          userId: $userId,
          videoId: $videoId
        }
      ) { success }
    }
  `,
  {
    name: 'unassignVideo'
  }
)
)(DescriptionLiveInput);
