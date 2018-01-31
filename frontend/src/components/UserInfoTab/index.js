import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { user: { username } } = state;
  return {
    username
  };
};

export default connect(mapStateToProps, null)(Container);
