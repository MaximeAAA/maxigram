import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import PasswordForm from "components/PasswordForm";
import ProfileForm from "components/ProfileForm";

const UserInfoTab = props => (
    <div className={styles.container}>
        <div className={styles.tab}>
            <Link to={`/${props.username}/profile/`}>
                <button className={props.editProfile ? styles.buttonClicked : styles.tabButton} onClick={props.openEditProfile}>Edit Profile</button>
            </Link>
            <Link to={`/${props.username}/password/`}>
                <button className={props.changePassword ? styles.buttonClicked : styles.tabButton} onClick={props.openChangePassword}>Change Password</button>
            </Link>
        </div>
        <div className={styles.tabcontent}>
            {props.changePassword && <PasswordForm/>}
            {props.editProfile && <ProfileForm/>}
        </div>
    </div>
);


UserInfoTab.propTypes = {
  editProfile: PropTypes.bool.isRequired,
  changePassword: PropTypes.bool.isRequired,
  openEditProfile: PropTypes.func.isRequired,
  openChangePassword: PropTypes.func.isRequired
};

export default UserInfoTab;