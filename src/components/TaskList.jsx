import React from 'react';
import { Typography } from 'material-ui';
import { RegularCard, Tasks } from 'components';
import { Player } from 'video-react';

const TaskList = ({ tasks }) => {
  const tasksParams = tasks.reduce((prevTasks, task) => {
    if(prevTasks.done) { prevTasks.checkedIndexes.push(task.id) }
    prevTasks.tasksIndexes.push(task.id)
    prevTasks.tasks[task.id] = task.name
    return prevTasks;
  }, { checkedIndexes: [], tasksIndexes: [], tasks: {} } );

  // debugger;

  return <RegularCard
    headerColor="green"
    cardTitle="Tarefas"
    content={
      <Typography component="div">
        <Tasks {...tasksParams} />
      </Typography>
  } />
}

export default TaskList;