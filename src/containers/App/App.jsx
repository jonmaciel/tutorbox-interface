import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from 'material-ui';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Header, Footer, Sidebar } from 'components';
import appRoutes from 'routes/app.jsx';
import { appStyle } from 'variables/styles';
import image from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/tutorbox.png';

import { getToken } from '../../consts.jsx';
const switchRoutes = <Switch>
  {
    appRoutes.map((prop, key) => {
      if(prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })
  }
</Switch>;

class App extends React.Component{
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  componentDidMount(){
    if(window.innerWidth > 991) {
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }

  isLogin(){
    return this.props.location.pathname === "/login";
  }

  isLogged(){
    return !!getToken()
  }

  componentDidUpdate(){
    this.refs.mainPanel.scrollTop = 0;
  }

  render(){
    const { classes, ...rest } = this.props;
    if(!this.isLogin() && !this.isLogged()) {
      rest.history.push('/login')
    }

    return (
      <div className={classes.wrapper}>
        {!this.isLogin() && <Sidebar
          routes={appRoutes}
          logoText="Tutorbox - ADM"
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />}
        <div className={!this.isLogin() && classes.mainPanel} ref="mainPanel">
          {!this.isLogin() && <Header
            routes={appRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />}
          <div className={classes.content}>
            <div className={classes.container}>
              {switchRoutes}
            </div>
          </div>
          {!this.isLogin() &&  <Footer />}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(appStyle, { withTheme: true })(App);
