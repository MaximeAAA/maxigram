import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { user: { user, username } } = state;
  return {
    user,
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
    userProfile: (type, username, profile_image) => {
      if(type === "get"){
        dispatch(userActions.userProfile(username));
      } else if(type === "put"){
        dispatch(userActions.updateUserImage(username, profile_image));
      } 
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
