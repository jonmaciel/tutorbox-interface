import React from 'react';
import { withStyles, Checkbox, IconButton, Table, TableBody, TableCell, TableRow, Tooltip } from 'material-ui';
import { Edit, Close, Check } from 'material-ui-icons';
import PropTypes from 'prop-types';
import { tasksStyle } from 'variables/styles';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TaskItem from './TaskItem.jsx';
import { isVideoProducer } from '../../consts.jsx';

class Tasks extends React.Component {
  state = {
    checked: this.props.checkedIndexes,
  };

  handleToggle = taskId => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];
    const addCheck = currentIndex === -1

    if (addCheck) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.onUpdate(taskId, undefined, addCheck);

    this.setState({
      checked: newChecked,
    });
  };

  onCreate = name => {
    console.log(this.props.videoId)
    this.props.createTask({
      variables: {
        videoId: this.props.videoId,
        name
      }
    }).then(({ data }) => {
      this.props.refetchTasks()
    }).catch(console.log);
  };

  onUpdate = (id, name, done) => {
    this.props.updateTask({
      variables: { id, name, done }
    }).then(console.log).catch(console.log);
  };

  onDelete = id => {
    this.props.destroyTask({
      variables: { id }
    }).then(() => this.props.refetchTasks()).catch(console.log);
  };

  render() {
    const { classes, tasksIndexes, tasks } = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {
            tasksIndexes.map(value => (
              <TaskItem
                id={value}
                checked={this.state.checked.indexOf(value) !== -1}
                name={tasks[value]}
                classes={classes}
                handleToggle={this.handleToggle}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
              />
            ))
          }
          {
            !isVideoProducer() &&
            <TaskItem
              isNew
              classes={classes}
              onCreate={this.onCreate}
            />
          }
        </TableBody>
      </Table>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node)
};

export default compose(
  graphql(
    gql`
      mutation createTask($name: String!, $videoId: ID!) {
        createTask(
          input: {
            name: $name,
            videoId: $videoId,
          }
        ) {
          task {
            id
          }
        }
      }
    `,
    {
      name: 'createTask'
    }
  ),
  graphql(
    gql`
      mutation updateTask($id: ID!, $name: String, $done: Boolean) {
        updateTask(
          input: {
            id: $id,
            name: $name,
            done: $done,
          }
        ) {
          task {
            id
          }
        }
      }
    `,
    {
      name: 'updateTask'
    }
  ),
  graphql(
    gql`
      mutation destroyTask($id: ID!) {
        destroyTask(input: { id: $id }) {
          success
        }
      }
    `,
    {
      name: 'destroyTask'
    }
  )
)(withStyles(tasksStyle)(Tasks));

