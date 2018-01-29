import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user: { userList} } = state; // redux/user.js..user안에 정의된 객체
    return {
        userList
    };
}

export default connect(mapStateToProps)(Container);