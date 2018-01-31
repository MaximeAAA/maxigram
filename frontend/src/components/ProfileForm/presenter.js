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
          <span className={formStyles.textLabel}>Name</span>
          <input
            type="text"
            className={formStyles.textInput}
            value={props.name}
            onChange={props.handleInputChange}
            name="name"
          />
        </div>
        <div className={formStyles.field}>
          <span className={formStyles.textLabel}>Username</span>
          <input
            type="text"
            className={formStyles.textInput}
            value={props.username}
            name="username"
            readOnly
          />
        </div>
        <div className={formStyles.field}>
          <span className={formStyles.textLabel}>Website</span>
          <input
            type="url"
            className={formStyles.textInput}
            value={props.website}
            onChange={props.handleInputChange}
            name="website"
            required
          />
        </div>
        <div className={formStyles.field}>
          <span className={formStyles.textLabel}>Bio</span>
          <textarea
            name="bio"
            value={props.bio}
            onChange={props.handleInputChange}
          />
        </div>
        <input
          type="submit"
          value={context.t("Submit")}
          className={formStyles.button}
        />
      </form>
    </div>
  </div>
);

ProfileForm.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  bio: PropTypes.string,
  website: PropTypes.string,
  
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

ProfileForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ProfileForm; 
