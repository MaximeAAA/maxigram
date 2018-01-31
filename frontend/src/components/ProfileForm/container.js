import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileForm from "./presenter";

class Container extends Component {
    state = {
        username: "",
        name: "",
        bio: "",
        website: ""
    }
    static propTypes = {
        userProfile: PropTypes.func.isRequired,
    };

    static contextTypes = { 
        t: PropTypes.func.isRequired,
    };    

    componentDidMount() {
        const { userProfile } = this.props;
        userProfile(this.props.username);
    }    

    componentWillReceiveProps = nextProps => {
        if(nextProps.user){
            this.setState({
                username: nextProps.user.username,
                name: nextProps.user.name,
                bio: nextProps.user.bio,
                website: nextProps.user.website

            });
        }
    }
    
    render() {
        return (
            <ProfileForm 
                {...this.props}
                {...this.state}
                handleInputChange={this._handleInputChange} 
                handleSubmit={this._handleSubmit} 
            />
        )
    };
    _handleInputChange = event => {
        const { target : { value, name} } = event;
        this.setState({
            [name]: value
        });
    }
    _handleSubmit = event => {
        const { updateUserProfile } = this.props;
        const { username, name, bio, website } = this.state;
        event.preventDefault();

        updateUserProfile(username, name, bio, website);
    }
}

export default Container;