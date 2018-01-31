import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import { Link } from "react-router-dom";

const ProfileImage = props => {
  return <div>
      {props.loading && <Loading />}
      {!props.loading && <RenderProfile {...props} />}
      {props.changeProfilePhoto && <RenderChangeProfilePhoto {...props} />}
    </div>;
};

const RenderProfile = (props, context) => {
  const _openFileSelect = () => {
    document.form.user_image.click();
  }
  return <div className={styles.container}>
      <div className={styles.profileImage}>
        <img src={props.user.profile_image || require("images/noPhoto.jpg")} alt={props.user.username} className={styles.image} onClick={props.user.profile_image ? props.openChangeProfilePhoto : _openFileSelect} />
      </div>
      <div className={styles.profileColumn}>
        <div className={styles.userInfo}>
          <div className={styles.username}>{props.user.username}</div>
          <button className={styles.button} onClick={props.user.profile_image ? props.openChangeProfilePhoto : _openFileSelect}>
            {context.t("Edit Profile Photo")}
          </button>
        </div>
      </div>
      <form name="form">
        <input type="file" name="user_image" className={styles.file} onChange={props.changeImage} />
      </form>
    </div>;

};


const RenderChangeProfilePhoto = (props, context) => {
  const _openFileSelect = () => {
    document.form.user_image.click();
  }
  return <div className={styles.configBox}>
      <div className={styles.box}>
        <div className={styles.header}>Change Profile Photo</div>
        <button className={styles.button} onClick={props.changeImage}>
          Remove Current Photo
        </button>
        <button className={styles.button} onClick={_openFileSelect}>
          Upload Photo
        </button>
        <button className={styles.button} onClick={props.closeChangeProfilePhoto}>
          Cancel
        </button>
      </div>
    </div>;
};

RenderProfile.contextTypes = {
  t: PropTypes.func.isRequired
};

ProfileImage.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    followers_count: PropTypes.number.isRequired,
    following_count: PropTypes.number.isRequired,
    post_count: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
  }),
  changeImage: PropTypes.func.isRequired,
  openChangeProfilePhoto: PropTypes.func.isRequired,
  closeChangeProfilePhoto: PropTypes.func.isRequired
};

export default ProfileImage;
