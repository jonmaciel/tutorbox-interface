import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';
import { RegularCard, Tasks } from 'components';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const TaskList = ({ videoId, data: { tasks, refetch } }) => {

  if(!tasks) { return <div /> }

  const tasksParams = tasks.reduce((prevTasks, task) => {
    if(task.done) {
      prevTasks.checkedIndexes.push(task.id)
    }

    prevTasks.tasksIndexes.push(task.id)
    prevTasks.tasks[task.id] = task.name

    return prevTasks;
  }, { checkedIndexes: [], tasksIndexes: [], tasks: {} } );

  return <RegularCard
    headerColor="green"
    cardTitle="Tarefas"
    content={
      <Typography component="div">
        <Tasks {...tasksParams} refetchTasks={refetch} videoId={videoId} />
      </Typography>
  } />
}

TaskList.propTypes = {
  videoId: PropTypes.string.isRequired
}

export default graphql(gql`
  query($videoId: ID!) {
    tasks(videoId: $videoId) {
      id
      name
      done
    }
  }
`,
{
  options: ({ videoId }) => ({ variables: { videoId } }),
})(TaskList);
