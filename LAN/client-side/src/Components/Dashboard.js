import React from "react";
import Navbar from "./Navbar";
import $ from "jquery";
import { useState, useEffect } from "react";
import avatar from "../images/avatar.jpg";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

import {
  fetchPosts,
  fetchCreatePost,
  fetchCreateComment,
  fetchProfile,
  fetchComments,
} from "../utils/api";
import Reaction from "./Reaction";
const MySwal = withReactContent(Swal);
export default function Dashboard() {
  const history = useNavigate();
  const [navColor] = useState("bg-dark");
  const [check, setCheck] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postComments, setPostComment] = useState("");
  const [info, setInfo] = useState({});
  const [postInfo, setPostInfo] = useState([]);
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([""]);
  const [postCommentInfo, setCommentInfo] = useState([]);

  const changeHandler = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setPostImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const changeHandler2 = (e) => {
    var postContent = e.target.value;
    setPostText(postContent);
  };
  const changeHandler3 = (e) => {
    var commentContent = e.target.value;
    setPostComment(commentContent);
  };

  useEffect(() => {
    const token = Cookies.get("session_token");
    setCheck(true);
    if (!token) {
      setCheck(false);
      MySwal.fire({
        icon: "error",
        title: `Unauthorized Access`,
        text: "Kindly Signin to access!",
      });
      history("/signin");
    } else {
      fetchProfile()
        .then((data) => {
          console.log("Profile : ", data);
          setInfo(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history, postComments, postText]);
  useEffect(() => {
    const token = Cookies.get("session_token");
    if (token) {
      fetchPosts()
        .then((res) => {
          if (res.message) {
            console.log("PostData : ", res.data);
            // const reaction=res

            setPostData(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const createPost = (e) => {
    e.preventDefault();
    const postField = document.getElementById("postField");
    const postImg = document.getElementById("postImg");
    if (postField.value === "") {
      postField.style.borderColor = "red";
      $("#" + postField.id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>This Value Is Required</p>"
      ).insertAfter(postField);
    } else if (postField.value.length > 250) {
      $("#" + postField.id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>Can't Exceed 250 characters!</p>"
      ).insertAfter(postField);
    } else {
      postField.style.borderColor = "#ced4da";
      $("#" + postField.id)
        .next("p")
        .remove();
      const token = Cookies.get("session_token");
      if (token) {
        fetchCreatePost(postText, postImage)
          .then((res) => {
            if (res.message) {
              MySwal.fire({
                icon: "success",
                title: `Post Created`,
                text: "Post Created Successfully!",
              });
              setPostInfo(res.data);
              setPostText("");
              setPostImage("");
            } else {
              MySwal.fire({
                icon: "error",
                title: `Error`,
                text: "Error Occured!",
              });
              console.log(res);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const createComment = (e, id) => {
    console.log(id);
    e.preventDefault();
    const token = Cookies.get("session_token");
    if (token) {
      fetchCreateComment(id, postComments)
        .then((res) => {
          console.log(res);
          if (res.message) {
            MySwal.fire({
              icon: "success",
              title: `Comment Created`,
              text: "Comment Created Successfully!",
            });
            setPostComment("");
            history("/dashboard");
          } else {
            MySwal.fire({
              icon: "error",
              title: `Error`,
              text: "Error Occured!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePost = (e, id) => {
    e.preventDefault();
    const token = Cookies.get("session_token");
    if (token) {
      fetchCreateComment(token, id, postComments)
        .then((res) => {
          if (res.status === 200) {
            MySwal.fire({
              icon: "success",
              title: `Post Deleted`,
              text: "Post Deleted Successfully!",
            });
            setCommentInfo(res.data);
            localStorage.setItem("ALL_COMMENTS", JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function del() {
    MySwal.fire({
      title: "Are you sure?",
      text: "All Your Posts Data Will Be Deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_login");
        let allUsersArray = JSON.parse(localStorage.getItem("USERKEY"));
        for (let n = allUsersArray.length - 1; n >= 0; n--) {
          let inner1 = allUsersArray[n];
          let keyf = Object.keys(inner1)[1];
          let keyff = inner1[keyf];
          if (keyff === info[1]) {
            allUsersArray.splice(n, 1);
          }
        }
        let allPostsArray = JSON.parse(localStorage.getItem("ALL_POSTS"));
        for (let n = allPostsArray.length - 1; n >= 0; n--) {
          let inner1 = allPostsArray[n];
          let keyf = Object.keys(inner1)[0];
          let keyff = inner1[keyf];
          if (keyff === info[1]) {
            allPostsArray.splice(n, 1);
          }
        }
        let allCommentsArray = JSON.parse(localStorage.getItem("ALL_COMMENTS"));
        for (let n = allCommentsArray.length - 1; n >= 0; n--) {
          let inner1 = allCommentsArray[n];
          let keyf = Object.keys(inner1)[1];
          let keyff = inner1[keyf];
          if (keyff === info[1]) {
            allCommentsArray.splice(n, 1);
          }
        }

        localStorage.setItem("ALL_POSTS", JSON.stringify(allPostsArray));
        localStorage.setItem("ALL_COMMENTS", JSON.stringify(allCommentsArray));
        localStorage.setItem("USERKEY", JSON.stringify(allUsersArray));
        setPostInfo(allPostsArray);
        console.log(postInfo);
        Swal.fire("Deleted!", "Your Profile has been deleted.", "success");
        history("/signup");
      }
    });
  }

  const addData = (e) => {
    setPostImage("");
    e.preventDefault();
    const allPosts = {
      id: info[1],
      img: postImage,
      text: postText,
      postId: Math.random(),
    };
    const postField = document.getElementById("postField");
    const postImg = document.getElementById("postImg");
    if (postField.value === "") {
      postField.style.borderColor = "red";
      $("#" + postField.id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>This Value Is Required</p>"
      ).insertAfter(postField);
    } else if (postField.value.length > 250) {
      $("#" + postField.id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>Can't Exceed 250 characters!</p>"
      ).insertAfter(postField);
    } else {
      postField.style.borderColor = "#ced4da";
      $("#" + postField.id)
        .next("p")
        .remove();
    }
  };
  const addComment = (e, key) => {
    e.preventDefault();
    const allComments = {
      id: key,
      user: info[1],
      comment: postComments,
    };
    const postCommentField = document.getElementById(key);
    if (postCommentField.value === "") {
      postCommentField.style.borderColor = "red";
      $("#" + postCommentField.id)
        .next("p")
        .remove();
      $(
        "<p id ='errorMsg' style = 'color: red;'>This Value Is Required</p>"
      ).insertAfter(postCommentField);
    } else {
      postCommentField.style.borderColor = "#ced4da";
      $("#" + postCommentField.id)
        .next("p")
        .remove();
      let data;
      data = fetchCreateComment(allComments);
      localStorage.setItem("ALL_COMMENTS", JSON.stringify(data));
      postCommentField.value = "";
      // postCommentData = "";
      // postCommentData = JSON.parse(localStorage.getItem("ALL_COMMENTS"));
      // setCommentInfo(postCommentData);
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Commented On Post Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      history("/dashboard");
    }
  };
  return (
    <div>
      <Navbar color={navColor} check={check} />
      <div className="container">
        <div className="row my-5 mx-2">
          <div className="col-md-6 col-12">
            <div className="card h-100">
              <div className="card-body">
                <h1 className="text-center">Profile</h1>
                <div className="row">
                  <div className="col-md-3 col-lg-3 col-4">
                    <img
                      className="mx-1 avatar"
                      src={avatar}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="col-6 my-2">
                    <h4 className="font-weight-bold">{info.username}</h4>
                    <span className="mt-0">
                      {info.username}
                      <hr className="mb-0" />
                      <span>Joined:</span>
                      <span className="mx-1">{info.createdAt}</span>
                    </span>
                    <br />
                  </div>
                  <div className="d-flex col-2 mt-4 justify-content-end">
                    <span className="text-dark">
                      <Link to="/profile">
                        <FontAwesomeIcon icon={faPencil}> </FontAwesomeIcon>
                      </Link>
                    </span>
                    <span className="text-danger mx-2">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={del}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 my-3">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h3>
                  Add New Post
                  <span>
                    <button
                      onClick={createPost}
                      type="button"
                      className="mx-2 btn btn-primary addPost"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </span>
                </h3>
                <form>
                  <textarea
                    rows={4}
                    type="text"
                    className="form-control"
                    placeholder="Your Thoughts..."
                    id="postField"
                    name="postField"
                    onChange={(e) => changeHandler2(e)}
                  />
                  <input
                    type="file"
                    className="form-control my-2"
                    name="uploadImage"
                    id="postImg"
                    accept="image/*"
                    onChange={(e) => changeHandler(e)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`row my-2 ${postData === null ? "d-none" : "d-block"}`}>
        <h1 className=" mb-2 text-center">
          ALL <span className=" my-2 colored-text">LOOP AGILE NOW</span> POSTS
        </h1>
      </div>
      <div
        className={`container my-2 ${postData === null ? "d-none" : "d-block"}`}
      >
        <div className="row my-1">
          <div className="col-md-12 col-12 text-center">
            <div className="row justify-content-center">
              <div className="col-md-6 col-12 ">
                <h4 className="text-center text-black my-2 mx-1">
                  {postData !== null ? (
                    postData.map((content) => {
                      const reactions = content.user.reactions;
                      const userReaction = reactions?.find((reaction) => {
                        return reaction.postId === content.id;
                      });
                      const list = (
                        <>
                          <img
                            className="mx-1 avatar"
                            src={avatar}
                            alt=""
                            height={80}
                            width={80}
                          />
                          <span className="text-black">@{content.id}</span>

                          <div className="col-12 my-2">
                            <h5 className=" text-dark py-3">
                              {" "}
                              {content.text}!
                            </h5>
                          </div>

                          <div className="col-md-12 col-12  my-2">
                            <img
                              className={`mx-1 img-fluid post-image ${
                                content.img === "" ? "d-none" : ""
                              }`}
                              src={content.img}
                              alt=""
                              height={400}
                              width={400}
                            />
                          </div>

                          <div className="col-md-12 col-12 my-2 ">
                            <Reaction
                              reaction={userReaction?.type}
                              postId={content.id}
                            ></Reaction>
                            <h4 className="text-center">COMMENT HERE</h4>
                            <form>
                              <textarea
                                rows={1}
                                type="text"
                                className="form-control"
                                placeholder="Any comment on Post..."
                                id={content.postId}
                                onChange={(e) => changeHandler3(e)}
                              />

                              <button
                                className="btn btn-outline-dark  my-3"
                                onClick={(e) => createComment(e, content.id)}
                              >
                                Add Comment
                              </button>
                            </form>
                            <h4 className={" my-2"}>Previous Comments</h4>

                            {content.comments !== null ? (
                              content.comments?.map((content2) => {
                                const list = (
                                  <>
                                    <h5
                                      className={`row mx-2 justify-content-center ${
                                        content.postId === content2.id
                                          ? "d-block"
                                          : "d-none"
                                      }`}
                                    >
                                      @ {content2.user?.username} ---{" "}
                                      {content2.text}
                                    </h5>
                                  </>
                                );
                                return list;
                              })
                            ) : (
                              <div className="loading">Loading...</div>
                            )}
                          </div>
                          <hr />
                        </>
                      );
                      return list;
                    })
                  ) : (
                    <>Loading</>
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
