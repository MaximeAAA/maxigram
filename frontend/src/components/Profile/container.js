import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    configBox: false,
    changeProfilePhoto: false
  };

  static propTypes = {
    userProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { userProfile } = this.props;
    userProfile("get");
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.user) {
      this.setState({
        loading: false,
        configBox: false,
        changeProfilePhoto: false
      });
    }
  };

  _openConfigBox = () => {
    this.setState({ configBox: true });
  };

  _closeConfigBox = () => {
    this.setState({ configBox: false });
  };

  _openChangeProfilePhoto = () => {
    this.setState({ changeProfilePhoto: true });
  };

  _closeChangeProfilePhoto = () => {
    this.setState({ changeProfilePhoto: false });
  };

  _changeImage = event => {
    const { userProfile } = this.props;
    event.preventDefault();
    userProfile("put", event.target.files? event.target.files[0] : "");
  };

  _logout = () => {
    const { userProfile } = this.props;
    userProfile("logout");
  }

  render() {
    const { user } = this.props;
    return (
      <Profile
        {...this.state}
        {...this.props}
        user={user}
        openConfigBox={this._openConfigBox}
        closeConfigBox={this._closeConfigBox}
        changeImage={this._changeImage}
        openChangeProfilePhoto={this._openChangeProfilePhoto}
        closeChangeProfilePhoto={this._closeChangeProfilePhoto}
        logout={this._logout}
      />
    );
  }
}


export default Container;