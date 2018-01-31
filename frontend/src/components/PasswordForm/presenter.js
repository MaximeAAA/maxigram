import React from "react";
import PropTypes from "prop-types";
import formStyles from "./styles.scss";
import ProfileImage from "components/ProfileImage";

const ProfileForm = (props, context) => (
  <div>
    <ProfileImage />
    <div className={formStyles.formComponent}>
      <form className={formStyles.form} onSubmit={props.handleSubmit}>
        <div className={formStyles.field}>
          <span className={formStyles.textLabel}>Current Password</span>
          <input
            type="password"
            className={formStyles.textInput}
            value={props.currentpasswordValue}
            onChange={props.handleInputChange}
            name="current_password"
            required
          />
        </div>
        <div className={formStyles.field}>
          <span className={formStyles.textLabel}>New Password</span>
          <input
            type="password"
            className={formStyles.textInput}
            value={props.newpasswordValue}
            onChange={props.handleInputChange}
            name="new_password"
            required
          />
        </div>
        <div className={formStyles.field}>
          <span className={formStyles.textLabel}>Confirm Password</span>
          <input
            type="password"
            className={formStyles.textInput}
            value={props.confirmpasswordValue}
            onChange={props.handleInputChange}
            name="confirm_password"
            required
          />
        </div>
        <input
          type="submit"
          value={context.t("Change Password")}
          className={formStyles.button}
        />
      </form>
    </div>
  </div>
);

ProfileForm.propTypes = {
  currentpasswordValue: PropTypes.string.isRequired,
  newpasswordValue: PropTypes.string.isRequired,
  confirmpasswordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

ProfileForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ProfileForm; 
