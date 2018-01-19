import { connect } from "react-redux";
import Container from "./container";

const mapStatetoProps = (state, ownProps) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn
  };
};

export default connect(mapStatetoProps)(Container);