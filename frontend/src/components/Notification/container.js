import React, { Component } from "react";
import PropTypes from "prop-types";
import Notification from "./presenter";

class Container extends Component{

    state = {
        loading: true
    };

    static propTypes = {
        getNotifications: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { getNotifications } = this.props;
        getNotifications();
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.notifications){
            this.setState({
                loading: false
            });
        }
    };    

    render () {
        const { notifications } = this.props;
        console.log(notifications);
        return (
            <Notification {...this.state} list={notifications} />
        )
    }
}

export default Container;
