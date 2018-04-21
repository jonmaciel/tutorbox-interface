import React from 'react';
import {
  Person, Notifications, Dashboard, Search,
} from 'material-ui-icons';
import classNames from 'classnames';
import {
  withStyles, IconButton, MenuItem, MenuList, Grow, Paper, ClickAwayListener, Hidden
} from 'material-ui';
import { Manager, Target, Popper } from 'react-popper';
import { CustomInput, IconButton as SearchButton } from 'components';
import { headerLinksStyle } from 'variables/styles';
import NotificationDropdown from './NotificationDropdown.jsx';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class HeaderLinks extends React.Component{
  state = {
    open: false,
  };

  handleClick = () => {
    this.props.data.refetch();
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    setInterval(
      () => this.props.data.refetch(),
    120 * 1000);
  }

  render(){
    const { classes, data } = this.props;
    const { open } = this.state;
    const notifications = !data.loading ? data.notifications : {};

    return (
      <div style={{ paddingTop: '10px' }}>
        <Manager style={{display:"inline-block"}}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={open ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick} className={classes.buttonLink}>
              <Notifications className={classes.links}/>
              {
                !!notifications.notificationsUnreadCount &&
                <span className={classes.notifications}>
                  {notifications.notificationsUnreadCount}
                </span>
              }
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>Notification</p>
              </Hidden>
            </IconButton>
          </Target>
          <NotificationDropdown notifications={notifications.videoNotifications} open={open} handleClose={this.handleClose}/>
        </Manager>
        <IconButton color="inherit" aria-label="Person" className={classes.buttonLink}>
          <Person className={classes.links}/>
          <Hidden mdUp>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </IconButton>
      </div>
    );
  }
}

export default graphql(gql`
  {
    notifications {
      notificationsUnreadCount
      videoNotifications {
        id
        body
        read
        video {
          id
        }
      }
    }
  }
`)(withStyles(headerLinksStyle)(HeaderLinks));

