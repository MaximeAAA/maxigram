import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileForm from "./presenter";

class Container extends Component {
    state = {
        current_password: "",
        new_password: "",
        confirm_password:""
    }
    static propTypes = {
        changePassword: PropTypes.func.isRequired,
    };

    static contextTypes = { 
        t: PropTypes.func.isRequired,
    };    

    render() {
        const { current_password, new_password, confirm_password } = this.state;
        return (
            <ProfileForm 
                handleInputChange={this._handleInputChange} 
                handleSubmit={this._handleSubmit} 
                currentpasswordValue={current_password} 
                newpasswordValue={new_password} 
                confirmpasswordValue={confirm_password} 
            />
        )
    }
    _handleInputChange = event => {
        const { target : { value, name} } = event;
        this.setState({
            [name]: value
        });
    }
    _handleSubmit = event => {
        const { changePassword } = this.props;
        const { current_password, new_password } = this.state;
        event.preventDefault();

        changePassword(current_password, new_password);
    }
}

export default Container;