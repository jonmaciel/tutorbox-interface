import React from 'react';
import classNames from 'classnames';
import { withStyles, MenuItem, MenuList, Grow, Paper, ClickAwayListener } from 'material-ui';
import { Popper } from 'react-popper';
import { NotificationDropdownStyle } from 'variables/styles';
import { headerLinksStyle } from 'variables/styles';
import { Link } from 'react-router-dom';

const NotificationDropdown = ({ notifications, classes: { dropdownItem, popperClose, dropdown, pooperResponsive}, open, handleClose }) =>
  <Popper
    placement="bottom-start"
    eventsEnabled={open}
    className={classNames({ [popperClose]: !open })+ " " + pooperResponsive}>
    <ClickAwayListener onClickAway={handleClose}>
      <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
        <Paper className={dropdown}>
          <MenuList role="menu">
           { notifications && notifications.map(notification =>
              <Link to={`/video/${notification.video.id}`}>
                <MenuItem key={notification.id} onClick={handleClose} className={dropdownItem}>
                  { notification.read ? '' : '* ' }{notification.body}
                </MenuItem>
              </Link>
            )}
          </MenuList>
        </Paper>
      </Grow>
    </ClickAwayListener>
  </Popper>

export default withStyles(headerLinksStyle)(NotificationDropdown);
