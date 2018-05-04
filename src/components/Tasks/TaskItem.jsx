import React from 'react';
import { Checkbox, IconButton, Table, TableBody, TableCell, TableRow, Tooltip } from 'material-ui';
import { Edit, Close, Check } from 'material-ui-icons';
import PropTypes from 'prop-types';
import { tasksStyle } from 'variables/styles';
import { graphql, compose } from 'react-apollo';
import { isVideoProducer } from '../../consts.jsx';
import gql from 'graphql-tag';

class TasksItem extends React.Component {
  state = {
    edit: false,
    name: this.props.name
  };

  render() {
    const { id, checked, classes, handleToggle, onDelete, onUpdate, onCreate, isNew } = this.props;
    const { edit, name } = this.state;

    return (
      <TableRow key={id} className={classes.tableRow}>
        <TableCell className={classes.tableCell}>
          {
            !edit && !isNew &&
            <Checkbox
              checked={checked}
              tabIndex={-1}
              onClick={handleToggle(id)}
              checkedIcon={<Check className={classes.checkedIcon}/>}
              icon={<Check className={classes.uncheckedIcon}/>}
              classes={{ checked: classes.checked }}
            />
          }
        </TableCell>
        <TableCell className={classes.tableCell}>
          {
            edit || isNew ?
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value }) }
            /> :
            name
          }
        </TableCell>
        <TableCell className={classes.tableActions}>
          <Tooltip
            id="tooltip-top"
            title={edit || isNew ? 'Save Task' : 'Edit Task'}
            placement="top"
            classes={{tooltip:classes.tooltip}}
          >
            <IconButton aria-label="Edit" className={classes.tableActionButton}>
              {
                !edit && !isNew ?
                <Edit
                  className={classes.tableActionButtonIcon + " " + classes.edit}
                  onClick={() => this.setState({ edit: true})}
                /> :
                <Edit
                  className={classes.tableActionButtonIcon + " " + classes.edit}
                  onClick={() => {
                    if(!name) { return }

                    isNew ?
                    onCreate(name) :
                    onUpdate(id, name, undefined);

                    if(isNew) { this.setState({ name: '' }) }

                    this.setState({ edit: false});
                  } }
                />
              }
            </IconButton>
          </Tooltip>
          <Tooltip
            id="tooltip-top-start"
            title="Remove"
            placement="top"
            classes={{tooltip:classes.tooltip}}>
            <IconButton aria-label="Close" className={classes.tableActionButton}>
              {
                !edit && !isNew &&
                <Close
                  onClick={() => onDelete(id)}
                  className={classes.tableActionButtonIcon + " " + classes.close}
                />
              }
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  }
}

TasksItem.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node)
};

export default TasksItem;

