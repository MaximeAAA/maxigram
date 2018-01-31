import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileImage from "./presenter";

class Container extends Component {
  state = {
    loading: true,
    changeProfilePhoto: false
  };

  static propTypes = {
    userProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { userProfile, username } = this.props;
    userProfile("get", username);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.user) {
      this.setState({
        loading: false,
        changeProfilePhoto: false
      });
    }
  };

  _openChangeProfilePhoto = () => {
    this.setState({ changeProfilePhoto: true });
  };

  _closeChangeProfilePhoto = () => {
    this.setState({ changeProfilePhoto: false });
  };

  _changeImage = event => {
    const { userProfile, username } = this.props;
    event.preventDefault();
    userProfile("put", username, event.target.files? event.target.files[0] : "");
  };



  render() {
    const { user } = this.props;
    return (
      <ProfileImage
        {...this.state}
        {...this.props}
        user={user}
        changeImage={this._changeImage}
        openChangeProfilePhoto={this._openChangeProfilePhoto}
        closeChangeProfilePhoto={this._closeChangeProfilePhoto}
      />
    );
  }
}


export default Container;