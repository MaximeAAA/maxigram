import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { user: { user, username } } = state;
  return {
    username,
    user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userProfile: (username) => {
            dispatch(userActions.userProfile(username));
        },
        updateUserProfile: (username, name, bio, website) => {
            dispatch(userActions.updateUserProfile(username, name, bio, website));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);