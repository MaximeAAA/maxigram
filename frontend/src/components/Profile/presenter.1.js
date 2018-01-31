import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Ionicon from "react-ionicons";
import Loading from "components/Loading";

const Profile = props => {
  return <div>
      {props.loading && <Loading />}
      {!props.loading && <RenderProfile {...props} />}
      {!props.loading && <RenderTab {...props} />}
      {props.configBox && <RenderConfigBox {...props} />}
      {props.changeProfilePhoto && <RenderChangeProfilePhoto {...props} />}
    </div>;
};

const RenderProfile = (props, context) => {
  const _openFileSelect = () => {
    document.form.user_image.click();
  }
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <img 
          src={props.user.profile_image || require("images/noPhoto.jpg")} 
          alt={props.user.username} 
          className={styles.avatar} 
          onClick={props.user.profile_image? props.openChangeProfilePhoto : _openFileSelect} 
        />
      </div>
      <div className={styles.column}>
        <div className={styles.userInfo}>
          <div className={styles.username}>{props.user.username}</div>
          <button className={styles.button}>
            {context.t("Edit Profile")}
          </button>
          <div className={styles.navIcon} onClick={props.openConfigBox}>
            <Ionicon icon="ios-settings-outline" fontSize="25px" color="black" />
          </div>
        </div>
        <div className={styles.userInfoCount}>
          <span className={styles.count}>
            {props.user.post_count} {context.t("Posts")}
          </span>
          <span className={styles.count}>
            {props.user.followers_count} {context.t("Followers")}
          </span>
          <span className={styles.count}>
            {props.user.following_count} {context.t("Following")}
          </span>
        </div>
        <div className={styles.userName}>
          <span className={styles.name}>{props.user.name}</span> {" "}
          <span className={styles.name}>
            {props.user.bio}
          </span>
        </div>
        <div className={styles.website}>{props.user.website}</div>
      </div>
      <form name="form">
        <input type="file" name="user_image" className={styles.file} onChange={props.changeImage} />
      </form>
    </div>
    );

};

const RenderTab = (props, context) => (
  <div className={styles.container}>
    <div className={styles.underline}>
      <div className={styles.tabButton}>{context.t("Post")}</div>
      <div className={styles.tabButton}>{context.t("Saved")}</div>
    </div>
  </div>
);

const RenderConfigBox = (props, context) => (
  <div className={styles.configBox}>
    <div className={styles.box}>
      <button className={styles.button}>Change Password</button>
      <button className={styles.button} onClick={props.logout}>Logout</button>
      <button className={styles.button} onClick={props.closeConfigBox}>Close</button>
    </div>
  </div>
);

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
RenderTab.contextTypes = {
  t: PropTypes.func.isRequired
};

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  configBox: PropTypes.bool.isRequired,
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
  openConfigBox: PropTypes.func.isRequired,
  closeConfigBox: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
  openChangeProfilePhoto: PropTypes.func.isRequired,
  closeChangeProfilePhoto: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Profile;
