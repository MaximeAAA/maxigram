import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changePassword: (current_password, new_password) => {
            dispatch(userActions.changePassword(current_password, new_password));
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);