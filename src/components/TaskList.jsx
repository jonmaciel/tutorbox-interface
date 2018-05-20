import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui';
import { RegularCard, Tasks } from 'components';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class TaskList extends Component {
  componentDidMount() {
    this.props.data.refetch();
  }

  tasksParams = (tasks) =>
    tasks.reduce((prevTasks, task) => {
      if(task.done) {
        prevTasks.checkedIndexes.push(task.id)
      }

      prevTasks.tasksIndexes.push(task.id)
      prevTasks.tasks[task.id] = task.name

      return prevTasks;
    }, { checkedIndexes: [], tasksIndexes: [], tasks: {} });


  render() {
   const { videoId, data: { tasks, refetch } } = this.props;

    if(!tasks) { return <div /> }

    return (
      <RegularCard
        headerColor="green"
        cardTitle="Tarefas"
        content={
          <Typography component="div">
            <Tasks
              {...this.tasksParams(tasks)}
              refetchTasks={refetch}
              videoId={videoId}
            />
          </Typography>
        }
       />
    )
  }
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
