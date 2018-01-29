import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import Container from "./container";

// user와 image가 검색되면 listen을 위해 state지정
const mapStateToProps = (state, ownProps) => {
    const { user: { userList, imageList }, routing: { location } } = state;
    return {
        imageList,
        userList,
        location
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: { searchTerm }}} = ownProps;
    return {
        searchByTerm: () => {
            dispatch(userActions.searchByTerm(searchTerm));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);