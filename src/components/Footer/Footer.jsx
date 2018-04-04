import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';

import { footerStyle } from 'variables/styles';

class Footer extends React.Component{
  render(){
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <Link to="/app/tutormakers" className={classes.block}>Tutormakers</Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/app/organizations" className={classes.block}>Organizações</Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/app/videos" className={classes.block}>Vídeos</Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/app/logout" className={classes.block}>Logout</Link>
              </ListItem>
            </List>
          </div>
          <p className={classes.right}>
            <span>
              &copy; { 1900 + (new Date()).getYear()}
              <a href="http://www.tutorbox.com.br" target="_blank" className={classes.a}>Tutorbox</a>,
              produzimos e mantemos atualizados os vídeos tutoriais de seu software.
            </span>
          </p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
