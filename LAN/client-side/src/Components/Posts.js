import React from "react";
import Navbar from "./Navbar";
import $ from "jquery";
import { useState, useEffect } from "react";
import avatar from "../images/avatar.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchDeletePost, fetchPosts } from "../utils/api";
import Cookies from "js-cookie";
const MySwal = withReactContent(Swal);
export default function Posts() {
  const history = useNavigate();
  const [navColor] = useState("bg-dark");
  const [check, setCheck] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [info] = useState([]);
  const [postInfo, setPostInfo] = useState([]);
  let data;
  const [postData, setPostData] = useState([]);
  const postField = document.getElementById("postField");
  useEffect(() => {
    const token = Cookies.get("session_token");
    if (token) {
      fetchPosts()
        .then((res) => {
          if (res.message) {
            console.log("PostData : ", res.data);
            setPostData(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const changeHandler = (e) => {
    e.preventDefault();
    var postContent = e.target.value;
    setPostText(postContent);
  };

  const changeHandler2 = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setPostImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  function deleteF(e, key) {
    let postKey = key;
    MySwal.fire({
      title: "Are you sure?",
      text: "Your Post Data Will Be Deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        postField.style.borderColor = "#ced4da";
        fetchDeletePost("postId")
          .then((data) => {
            console.log(data);
            setPostInfo(data.data);
            MySwal.fire("Deleted!", "Your Post has been deleted.", "success");
            history("/posts");
          })
          .catch((err) => console.log(err));
      }
    });
  }

  function update(e, key) {
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

      let postKey = key;
      console.log(postKey);
      const allPosts = {
        id: info[1],
        img: postImage,
        text: postText,
        postId: postKey,
      };
      console.log(postKey);
      MySwal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let allPostsArray = JSON.parse(localStorage.getItem("ALL_POSTS"));
          for (let n = allPostsArray.length - 1; n >= 0; n--) {
            let inner1 = allPostsArray[n];
            let keyf = Object.keys(inner1)[3];
            let keyff = inner1[keyf];
            if (keyff === postKey) {
              allPostsArray.splice(n, 1);
            }
          }
          localStorage.setItem("ALL_POSTS", JSON.stringify(allPostsArray));
          let data2;
          try {
            data2 = allPostsArray;
            data2.push(allPosts);
          } catch (error) {
            data2 = [allPosts];
          }
          localStorage.setItem("ALL_POSTS", JSON.stringify(data2));
          setPostInfo(allPostsArray);
          console.log(postInfo);

          history("/posts");
          MySwal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          MySwal.fire("Changes are not saved", "", "info");
        }
      });
    }
  }
  useEffect(() => {
    if (data) {
      setCheck(true);
    } else {
      setCheck(false);
      MySwal.fire({
        icon: "error",
        title: `Unauthorized Access`,
        text: "Kindly Signin to access!",
      });
      history("/signin");
    }
  }, [data, history]);

  let allPostsArray = JSON.parse(localStorage.getItem("ALL_POSTS"));
  if (allPostsArray !== null) {
    for (let n = allPostsArray.length - 1; n >= 0; n--) {
      let inner1 = allPostsArray[n];
      let keyf = Object.keys(inner1)[0];
      let keyff = inner1[keyf];
      if (keyff !== info[1]) {
        allPostsArray.splice(n, 1);
      }
    }
    postData = allPostsArray;
  }

  return (
    <div>
      <Navbar color={navColor} check={check} />
      <div className={`row my-2 ${postData === null ? "d-none" : "d-block"}`}>
        <h1 className="text-center">
          ALL <span className="colored-text">{info[0]}</span> POSTS
        </h1>
      </div>
      <div
        className={`container my-2 ${postData === null ? "d-none" : "d-block"}`}
      >
        <div className="row my-1">
          <div className="col-md-12 col-12 text-center">
            <div className="row justify-content-center">
              <div className="col-md-6 col-12 ">
                <h5 className="text-center text-black my-2 mx-1">
                  {postData !== null
                    ? postData.map((content) => {
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
                            <span>
                              <hr />
                              <FontAwesomeIcon
                                onClick={(e) => update(e, content.postId)}
                                icon={faPencil}
                              >
                                {" "}
                              </FontAwesomeIcon>
                              <span className="mx-3 text-danger">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={(e) => deleteF(e, content.postId)}
                                >
                                  {" "}
                                </FontAwesomeIcon>
                              </span>
                              <hr />
                            </span>
                            <div className="col-12 my-2">
                              <span className=" text-dark py-3">
                                {" "}
                                {content.text}
                              </span>
                            </div>
                            <textarea
                              rows={4}
                              type="text"
                              className="form-control"
                              placeholder="Insert Updated Post Content"
                              id="postField"
                              name="postField"
                              onChange={(e) => changeHandler(e)}
                            />
                            <input
                              type="file"
                              className="form-control my-2"
                              name="uploadImage"
                              id="postImg"
                              accept="image/*"
                              onChange={(e) => changeHandler2(e)}
                            />

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
                            <div className="col-md-12 col-12 my-2 "></div>
                            <hr />
                          </>
                        );
                        return list;
                      })
                    : ""}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 text-center row">
        <h2>{`${postData === null ? "NO POSTS!" : ""}`}</h2>
      </div>
    </div>
  );
}
