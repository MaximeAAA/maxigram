import { connect } from "react-redux";
import Container from "./container";

const mapStatetoProps = (state, ownProps) => {
  const { user, routing: {location} } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    pathname: location.pathname,
    username: user.username
  };
};

export default connect(mapStatetoProps)(Container);