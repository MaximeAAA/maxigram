import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

class Container extends Component{
    state = {
        term: "",
        notification: false
    }
    static propTypes = {
        goToSearch: PropTypes.func.isRequired
    }
    render() {
        return (
            <Navigation 
                {...this.state}
                onSubmit={this._onSubmit} 
                onInputChange={this._onInputChange} 
                value={this.state.term} 
                username={this.props.username}
                onNotification={this._onNotification}
                closeNotification={this._closeNotification}
            />
        );
    }
    _onInputChange = (event) => {
        const { target: {value} } = event;
        this.setState({
            term: value
        });
    }
    _onSubmit = event => {
        const { goToSearch } = this.props;
        const { term } = this.state;
        event.preventDefault();
        goToSearch(term);
        this.setState({
            term: ""
        });
    }

    _onNotification = () => {
        const { notification } = this.state;
        
        if(notification) {
            this.setState({
                notification: false
            });
        } else {
            this.setState({
                notification: true
            });
        }
    }
    
    _closeNotification = () => {
        this.setState({
            notification: false
        });
    }

}

export default Container;