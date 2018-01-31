import React, { Component } from "react";
import UserInfoTab from "./presenter";

class Container extends Component {
  state = {
    editProfile: true,
    changePassword: false
  };
  
  componentDidMount(){
    console.log(this.props.match.path);
      if(this.props.match.path === "/:username/password/"){
        this._openChangePassword();
      } else if(this.props.match.path === "/:username/profile/"){
        this._openEditProfile();
      }
  }

  _openEditProfile = () => {
      this.setState({
        editProfile: true,
        changePassword: false
      });
  }

  _openChangePassword = () => {
      this.setState({
        editProfile: false,
        changePassword: true
      });
  }
  
  render() {
      return (
        <UserInfoTab 
            {...this.props} 
            {...this.state} 
            openEditProfile={this._openEditProfile} 
            openChangePassword={this._openChangePassword}
        />
      );
  }

}

export default Container;