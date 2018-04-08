import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Drawer } from 'material-ui';
import { sidebarStyle } from 'variables/styles';

class Sidebar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        anchor='rigth'
        type="permanent"
        open
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.videoSidebarStyle}>
          AAAAAAAAAAAAAA
        </div>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle, { withTheme: true })(Sidebar);
