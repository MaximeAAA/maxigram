// import
// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

// action creators
function saveToken(json){
    const {token} = json;
    const { user: { username} } = json;
    return {
        type: SAVE_TOKEN,
        token,
        username
    }
}

function logout() {
    return {
        type: LOGOUT
    }
}

function setUserList(userList) {
    return {
        type: SET_USER_LIST,
        userList
    }
}

function setFollowUser(userId){
    return {
        type: FOLLOW_USER,
        userId
    }
}

function setUnfollowUser(userId){
    return {
        type: UNFOLLOW_USER,
        userId
    }
}

function setImageList(imageList){
    return {
        type: SET_IMAGE_LIST,
        imageList
    }
}

function setUserProfile(user){
    return {
        type: SET_USER_PROFILE,
        user
    }
}

function setNotifications(notifications){
    return {
        type: SET_NOTIFICATIONS,
        notifications
    }
}

// API actions

function facebookLogin(access_token){
    return function(dispatch) {
        fetch("/users/login/facebook/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token: access_token
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                dispatch(saveToken(json));
            }
        })
        .catch(err => console.log(err));
    }
}

function usernameLogin(username, password) {
    return function(dispatch) {
        fetch("/rest-auth/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username,
              password
          })
        })
        .then(response => response.json())
        .then(json => {
            if(json.token){
                dispatch(saveToken(json));
            }
        })
        .catch(err => console.log(err));
    }
}

function createAccount(email, name, password, username) {
  return function(dispatch) {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email,
        name
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token, username));
        }
      })
      .catch(err => console.log(err));
  };
}

function getPhotoLikes(photoId) {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`/images/${photoId}/likes/`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => {
            dispatch(setUserList(json));
        });
    };
}

function followUser(userId){
    return (dispatch, getState) => {
        dispatch(setFollowUser(userId));

        const { user: {token} } = getState();
        fetch(`/users/${userId}/follow/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(logout());
            } else if(!response.ok) { // 문제가 발생시 rollback
                dispatch(setUnfollowUser(userId));
            }
        })
    }
}

function unfollowUser(userId){
    return (dispatch, getState) => {
      dispatch(setUnfollowUser(userId));

      const { user: { token } } = getState();
      fetch(`/users/${userId}/unfollow/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-type": "application/json"
        }
      }).then(response => {
        if (response.status === 401) {
          dispatch(logout());
        } else if (!response.ok) {
          // 문제가 발생시 rollback
          dispatch(setFollowUser(userId));
        }
      });
    };
}

function getExplore(){
    console.log("getExplore");
    return (dispatch, getState) => {
      const { user: { token } } = getState();
      fetch(`/users/explore/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        } 
        return response.json();
      })
      .then(json => dispatch(setUserList(json)));
    };
}

function searchByTerm(searchTerm){
    return async(dispatch, getState) => {
        const { user : { token } } = getState();
        const userList = await searchUsers(token, searchTerm);
        const imageList = await searchImages(token, searchTerm);

        if(userList === 401 || imageList === 401){
            dispatch(logout());
        }
        
        dispatch(setUserList(userList));
        dispatch(setImageList(imageList));
    }
}

function searchUsers(token, searchTerm) {
    return fetch(`/users/search/?username=${searchTerm}`, {
        headers: {
            "Authorization": `JWT ${token}`
        }
    })
    .then(response => {
        if(response.status === 401){
            return 401;
        }
        return response.json()
    })
    .then(json => json); //.then(json => {return json}})
}

function searchImages(token, searchTerm) {
    return fetch(`/images/search/?hashtags=${searchTerm}`, {
        headers: {
            "Authorization": `JWT ${token}`
        }
    })
    .then(response => {
        if(response.status === 401){
            return 401;
        }
        return response.json()
    })
    .then(json => json); //.then(json => {return json}})
}

function userProfile(username){
    return (dispatch, getState) => {
        const { user: {token} } = getState();
        fetch(`/users/${username}/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                dispatch(logout());
            }
            return response.json();
        })
        .then(json => dispatch(setUserProfile(json)));
    }
}

function updateUserImage(username, profile_image) {
    return (dispatch, getState) => {
        const { user: {token} } = getState();
        var formData = new FormData();
        formData.append("profile_image", profile_image);

        fetch(`/users/${username}/`, {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`
          },
          body: formData
        })
        .then(response => {
          if (response.status === 401) {
            dispatch(logout());
          }
          return response.json();
        })
        .then(json => dispatch(setUserProfile(json)));       
    }
}

function updateUserProfile(username, name, bio, website) {
    return (dispatch, getState) => {
        const { user: {token} } = getState();
        var formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("website", website);

        fetch(`/users/${username}/`, {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`
          },
          body: formData
        })
        .then(response => {
          if (response.status === 401) {
            dispatch(logout());
          }
          return response.json();
        })
        .then(json => dispatch(setUserProfile(json)));       
    }
}

function getNotifications() {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`/notifications/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
        if (response.status === 401) {
            dispatch(logout());
        }
        return response.json();
    })
    .then(json => dispatch(setNotifications(json)));
  };
}

function changePassword(current_password, new_password){
    return (dispatch, getState) => {
        const { user: { token, username } } = getState();
        fetch(`/users/${username}/password/`, {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username,
              current_password,
              new_password
          })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
        .catch(err => console.log(err));
    }
};


// inital state
const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token: localStorage.getItem("jwt"),
    username: localStorage.getItem("username")
};

// reducer
// actino = actionCreator의 인자값
function reducer(state = initialState, action){
    switch (action.type) {
      case SAVE_TOKEN:
        return applySetToken(state, action);
      case LOGOUT:
        return applyLogout(state, action);
      case SET_USER_LIST:
        return applySetUserList(state, action);
      case FOLLOW_USER:
        return applyFollowUser(state, action);
      case UNFOLLOW_USER:
        return applyUnfollowUser(state, action);
      case SET_IMAGE_LIST:
        return applySetImageList(state, action);
      case SET_USER_PROFILE:
        return applySetUserProfile(state, action);
      case SET_NOTIFICATIONS:
        return applySetNotifications(state, action);
      default:
        return state;
    }
}

// reducer functions

function applySetToken(state, action){
    const { token } = action;
    const { username } = action;
    localStorage.setItem("jwt", token);
    localStorage.setItem("username", username);
    return {
        ...state,
        isLoggedIn: true,
        token,
        username
    }
}

function applyLogout(state, action){
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    return {
        isLoggedIn: false
    }
}

function applySetUserList(state, action) {
    console.log("applySetUserList");
    const { userList } = action;
    return {
        ...state,
        userList
    }
}

function applyFollowUser(state, action) {
    const { userId } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
        if(user.id === userId){
            return { ...user, following:true }
        } 
        return user;
    });

    return { ...state, userList:updatedUserList }
}

function applyUnfollowUser(state, action) {
    const { userId } = action;
    const { userList } = state;
    const updatedUserList = userList.map(user => {
      if (user.id === userId) {
        return { ...user, following: false };
      }
      return user;
    });

    return { ...state, userList: updatedUserList };
}

function applySetImageList(state, action){
    const { imageList } = action;
    return {
        ...state,
        imageList
    };
}

function applySetUserProfile(state, action){
    const { user } = action;
    return {
        ...state, 
        user
    };
}

function applySetNotifications(state, action){
    const { notifications } = action;
    return {
        ...state,
        notifications
    };
}

// exports
const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  logout,
  getPhotoLikes,
  followUser,
  unfollowUser,
  getExplore,
  searchByTerm,
  userProfile,
  updateUserImage,
  updateUserProfile,
  getNotifications,
  changePassword
};

export { actionCreators };

// reducer export
export default reducer;