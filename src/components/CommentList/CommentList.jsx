import React, { Component } from 'react';
import { RegularCard, Table, CustomInput, Button } from 'components';
import { P } from 'components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import NewComment from './NewComment.jsx';

const style = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
}

class CommentList extends Component {

  componentDidMount() {
    setInterval(
      () => this.props.data.refetch(),
    10000);
  }

  render () {
    const { classes: { typo, note }, data: { video, refetch }, error } = this.props;
    if (!video) { return <div /> }
    return <RegularCard
      headerColor="green"
      cardTitle="Comentários"
      content={
      <div>
        {video.comments.map(({ body, author: { name }}) =>
          <div className={typo}>
            <div className={note}>
              {name}
            </div>
            <P>{body}</P>
          </div>
        )}
        <NewComment videoId={video.id} refetchComments={refetch} />
      </div>
    } />
  }

};

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default graphql(gql`
query($videoId: ID!) {
  video(id: $videoId) {
    id
    comments {
      id
      body
      author { name }
    }
  }
}`, {
  options: ({ videoId }) => ({ variables: { videoId } }),
})(withStyles(style)(CommentList));
