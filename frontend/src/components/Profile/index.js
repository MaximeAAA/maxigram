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
  const { match: { params: { username } } } = ownProps;
  
  return {
    userProfile: (type, profile_image) => {
      if(type === "get"){
        dispatch(userActions.userProfile(username));
      } else if(type === "put"){
        dispatch(userActions.updateUserImage(username, profile_image));
      } else if(type === "logout"){
        dispatch(userActions.logout());
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
