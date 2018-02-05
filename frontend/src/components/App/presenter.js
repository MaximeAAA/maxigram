import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import  "./styles.scss";
import Footer from "components/Footer";
import Auth from "components/Auth";
import Navigation from "components/Navigation";
import Feed from "components/Feed";
import Explore from "components/Explore";
import Search from "components/Search";
import Profile from "components/Profile";
import UserInfoTab from "components/UserInfoTab";

const App = props => [
  //!props.isLoggedIn? <Redirect to="/"/> : null,
  // Navigation
  props.isLoggedIn ? <Navigation key={1} /> : null,
  // Routes
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  // Footer
  <Footer key={3} />
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string
};

const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/explore" component={Explore} />
    <Route exact path="/search/:searchTerm" component={Search} />
    <Route exact path="/:username/" component={Profile} />
    <Route exact path="/:username/password/" component={UserInfoTab} />
    <Route exact path="/:username/profile/" component={UserInfoTab} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => "password"} />
  </Switch>
);

export default App;
