const fetchProfile = () => {
  return fetch("/api/user/profile", {
    method: "POST",
    mode: "cors",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchPosts = () => {
  return fetch("/api/post/allposts", {
    method: "POST",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchComments = (postId) => {
  console.log("Post:  ", postId);
  return fetch("/api/post/comments", {
    method: "POST",
    mode: "cors",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDashboard = () => {
  return fetch("/api/dashboard", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchSignin = () => {
  return fetch("/api/signin", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchSignup = () => {
  return fetch("/api/signup", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};

const fetchCreatePost = (postText, postImage) => {
  return fetch("/api/post/createpost", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      img: postImage,
      text: postText,
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDeletePost = () => {
  return fetch("/api/deletepost", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchUpdatePost = () => {
  return fetch("/api/updatepost", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchUpdateProfile = (user) => {
  console.log(user);
  return fetch("/api/user/updateprofile", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDeleteProfile = () => {
  return fetch("/api/deleteprofile", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchCreateComment = (postId, text) => {
  return fetch("/api/post/createcomment", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
      text: text,
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDeleteComment = () => {
  return fetch("/api/deletecomment", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchUpdateComment = () => {
  return fetch("/api/updatecomment", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchCreateReaction = (postId, reaction) => {
  return fetch("/api/post/createreaction", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
      type: reaction,
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDeleteReaction = () => {
  return fetch("/api/deleteReaction", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchCreateFollow = () => {
  return fetch("/api/createfollow", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDeleteFollow = () => {
  return fetch("/api/deletefollow", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchCreateMessage = () => {
  return fetch("/api/createmessage", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDeleteMessage = () => {
  return fetch("/api/deletemessage", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchCreateNotification = () => {
  return fetch("/api/createnotification", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchDeleteNotification = () => {
  return fetch("/api/deletenotification", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
const fetchUpdateNotification = () => {
  return fetch("/api/updatenotification", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error));
};
export {
  fetchProfile,
  fetchDashboard,
  fetchPosts,
  fetchCreateComment,
  fetchDeleteComment,
  fetchUpdateComment,
  fetchCreateReaction,
  fetchDeleteReaction,
  fetchCreateFollow,
  fetchDeleteFollow,
  fetchCreateMessage,
  fetchDeleteMessage,
  fetchCreateNotification,
  fetchDeleteNotification,
  fetchUpdateNotification,
  fetchCreatePost,
  fetchDeletePost,
  fetchUpdatePost,
  fetchDeleteProfile,
  fetchUpdateProfile,
  fetchComments,
};
