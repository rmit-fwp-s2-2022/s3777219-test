import React from 'react'
import Navbar from './Navbar'
import $ from 'jquery';
import { useState, useEffect } from 'react'
import avatar from '../images/avatar.jpg'
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
const MySwal = withReactContent(Swal);
export default function Dashboard() {
  const history = useNavigate();
  const [navColor] = useState('bg-dark');
  const [check, setCheck] = useState(false);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState('');
  const [postComments, setPostComment] = useState('');
  const [info] = useState([]);
  const [postInfo, setPostInfo] = useState([]);
  const [postCommentInfo, setCommentInfo] = useState([]);
  let data;
  let postData;
  let postCommentData;
  data = JSON.parse(localStorage.getItem("user_login"));
  postData = JSON.parse(localStorage.getItem("ALL_POSTS"));
  postCommentData = JSON.parse(localStorage.getItem("ALL_COMMENTS"));

  if (data != null) {
    let data2 = data[0];
    for (let j = 0; j <= 3; j++) {
      let key1 = Object.keys(data2)[j];
      info.push(data2[key1]);
    }
  }

  const changeHandler = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setPostImage(event.target.result)
    };

    reader.readAsDataURL(file);
  }
  const changeHandler2 = (e) => {
    var postContent = e.target.value;
    setPostText(postContent)
  }
  const changeHandler3 = (e) => {
    var commentContent = e.target.value;
    setPostComment(commentContent)
  }


  useEffect(() => {
    if (data) {
      setCheck(true);
    }
    else {
      setCheck(false)
      MySwal.fire({
        icon: 'error',
        title: `Unauthorized Access`,
        text: 'Kindly Signin to access!'
      })
      history('/signin')
    }
  }, [data, history]);

  function del() {
    MySwal.fire({
      title: 'Are you sure?',
      text: "All Your Posts Data Will Be Deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_login");
        let allUsersArray = JSON.parse(localStorage.getItem("USERKEY"));
        for (let n = allUsersArray.length - 1; n >= 0; n--) {
          let inner1 = allUsersArray[n];
          let keyf = Object.keys(inner1)[1];
          let keyff = inner1[keyf]
          if (keyff === info[1]) {
            allUsersArray.splice(n, 1);
          }
        }
        let allPostsArray = JSON.parse(localStorage.getItem("ALL_POSTS"));
        for (let n = allPostsArray.length - 1; n >= 0; n--) {
          let inner1 = allPostsArray[n];
          let keyf = Object.keys(inner1)[0];
          let keyff = inner1[keyf]
          if (keyff === info[1]) {
            allPostsArray.splice(n, 1);
          }
        }
        let allCommentsArray = JSON.parse(localStorage.getItem("ALL_COMMENTS"));
        for (let n = allCommentsArray.length - 1; n >= 0; n--) {
          let inner1 = allCommentsArray[n];
          let keyf = Object.keys(inner1)[1];
          let keyff = inner1[keyf]
          if (keyff === info[1]) {
            allCommentsArray.splice(n, 1);
          }
        }

        localStorage.setItem("ALL_POSTS", JSON.stringify(allPostsArray))
        localStorage.setItem("ALL_COMMENTS", JSON.stringify(allCommentsArray))
        localStorage.setItem("USERKEY", JSON.stringify(allUsersArray))
        setPostInfo(allPostsArray)
        console.log(postInfo)
        Swal.fire(
          'Deleted!',
          'Your Profile has been deleted.',
          'success'
        )
        history('/signup')
      }
    })
  }

  const addData = (e) => {
    setPostImage('');
    e.preventDefault();
    const allPosts = {
      id: info[1],
      img: postImage,
      text: postText,
      postId: Math.random()
    };
    const postField = document.getElementById('postField');
    const postImg = document.getElementById('postImg');
    if (postField.value === '') {
      postField.style.borderColor = 'red'
      $('#' + postField.id).next('p').remove();
      $("<p id ='errorMsg' style = 'color: red;'>This Value Is Required</p>").insertAfter(postField);
    }
    else if (postField.value.length > 250) {
      $('#' + postField.id).next('p').remove();
      $("<p id ='errorMsg' style = 'color: red;'>Can't Exceed 250 characters!</p>").insertAfter(postField);
    }
    else {

      postField.style.borderColor = '#ced4da'
      $('#' + postField.id).next('p').remove();

      let data;
      try {
        data = JSON.parse(localStorage.getItem("ALL_POSTS"));
        data.push(allPosts);
      } catch (error) {
        data = [allPosts];
      }
      localStorage.setItem("ALL_POSTS", JSON.stringify(data));
      postField.value = ''
      postImg.value = ''
      postData = ''
      postData = JSON.parse(localStorage.getItem("ALL_POSTS"));
      setPostInfo(postData)
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Post Uploaded Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      history("/dashboard");
    }
  };
  const addComment = (e, key) => {
    e.preventDefault();
    const allComments = {
      id: key,
      user: info[1],
      comment: postComments
    };
    const postCommentField = document.getElementById(key);
    if (postCommentField.value === '') {
      postCommentField.style.borderColor = 'red'
      $('#' + postCommentField.id).next('p').remove();
      $("<p id ='errorMsg' style = 'color: red;'>This Value Is Required</p>").insertAfter(postCommentField);
    }
    else {
      postCommentField.style.borderColor = '#ced4da'
      $('#' + postCommentField.id).next('p').remove();
      let data;
      try {
        data = JSON.parse(localStorage.getItem("ALL_COMMENTS"));
        data.push(allComments);
      } catch (error) {
        data = [allComments];
      }
      localStorage.setItem("ALL_COMMENTS", JSON.stringify(data));
      postCommentField.value = ''
      postCommentData = ''
      postCommentData = JSON.parse(localStorage.getItem("ALL_COMMENTS"));
      setCommentInfo(postCommentData)
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Commented On Post Successfully!',
        showConfirmButton: false,
        timer: 1500
      })

      history("/dashboard");
    }
    console.log(postCommentInfo)
  };

  return (

    <div>
      <Navbar color={navColor} check={check} />
      <div className="container">
        <div className="row my-5 mx-2">
          <div className="col-md-6 col-12">
            <div className="card h-100">
              <div className="card-body">
                <h1 className='text-center'>
                  Profile
                </h1>
                <div className="row">
                  <div className="col-md-3 col-lg-3 col-4">
                    <img className='mx-1 avatar' src={avatar} alt="" height={100} width={100} />
                  </div>
                  <div className="col-6 my-2">
                    <h4 className='font-weight-bold'>{info[0]}</h4>
                    <span className='mt-0' >
                      {info[1]}
                      <hr className='mb-0' />
                      <span>
                        Joined:
                      </span>
                      <span className='mx-1'>
                        {info[3]}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className="d-flex col-2 mt-4 justify-content-end">
                    <span className='text-dark'>
                      <Link to='/profile'>
                        <FontAwesomeIcon icon={faPencil}> </FontAwesomeIcon>
                      </Link>
                    </span>
                    <span className='text-danger mx-2'>
                      <FontAwesomeIcon icon={faTrash} onClick={del}></FontAwesomeIcon>
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
                    <button onClick={addData} type="button" className="mx-2 btn btn-primary addPost"><FontAwesomeIcon icon={faPlus} /></button>
                  </span>
                </h3>
                <form>
                  <textarea rows={4} type="text" className="form-control" placeholder='Your Thoughts...' id='postField' name='postField'
                    onChange={(e) => changeHandler2(e)}
                  />
                  <input type="file" className="form-control my-2" name="uploadImage" id="postImg" accept="image/*"
                    onChange={(e) => changeHandler(e)}
                  />

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`row my-2 ${postData === null ? 'd-none' : 'd-block'}`}>
        <h1 className=' mb-2 text-center'>
          ALL <span className=' my-2 colored-text'>LOOP AGILE NOW</span> POSTS
        </h1>
      </div>
      <div className={`container my-2 ${postData === null ? 'd-none' : 'd-block'}`}>
        <div className="row my-1">
          <div className="col-md-12 col-12 text-center">
            <div className="row justify-content-center">
              <div className="col-md-6 col-12 ">
                <h4 className='text-center text-black my-2 mx-1'>
                  {postData !== null ? (postData.map((content) => {
                    const list = (
                      <>
                        <img className='mx-1 avatar' src={avatar} alt="" height={80} width={80} />
                        <span className='text-black'>@{content.id}</span>

                        <div className="col-12 my-2"><h5 className=' text-dark py-3'> {content.text}!</h5></div>

                        <div className="col-md-12 col-12  my-2">
                          <img className={`mx-1 img-fluid post-image ${content.img === '' ? 'd-none' : ''}`} src={content.img} alt="" height={400} width={400} />
                        </div>
                        <div className="col-md-12 col-12 my-2 ">
                          <h4 className='text-center'>
                            COMMENT HERE
                          </h4>
                          <form >
                            <textarea rows={1} type="text" className="form-control" placeholder='Any comment on Post...' id={content.postId}
                              onChange={(e) => changeHandler3(e)}
                            />
                            <button className="btn btn-outline-dark  my-3"
                              onClick={(e) => addComment(e, content.postId)}
                            >
                              Add Comment
                            </button>
                          </form>
                          <h4 className={' my-2'}>
                            Previous Comments
                          </h4>

                          {postCommentData !== null ? (postCommentData.map((content2) => {
                            const list = (
                              <>
                                <h5 className={`row mx-2 justify-content-center ${content.postId === content2.id ? 'd-block' : 'd-none'}`}>
                                  @ {content2.user} ---   {content2.comment}
                                </h5>

                              </>
                            );
                            return list;
                          })) : ''}


                        </div>
                        <hr />
                      </>
                    );
                    return list;
                  })) : ''}
                </h4>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
