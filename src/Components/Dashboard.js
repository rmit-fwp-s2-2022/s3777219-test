import React from 'react'
import Navbar from './Navbar'
import {useState} from 'react'
import avatar from '../images/avatar.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faPencil,faTrash,faPlus,faCamera } from '@fortawesome/free-solid-svg-icons'
export default function Dashboard() {
  const[navColor] = useState('bg-dark')
  return (
    <div>
      <Navbar color={navColor} />
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
                    <img className='mx-3 avatar' src={avatar} alt="" height={100} width={100}/>
                  </div>
                  <div className="col-6 my-2">
                    <h4 className='font-weight-bold'>
                    John Smith<br/><h6 className='mt-1' >John@smith.info<br/><hr/><h6>Joined: <span>Thursday 28 Jul 2022</span></h6></h6>
                    </h4>
                    <br/>
                  </div>
                  <div className="col-2 mt-4 ">
                    <span className='text-dark'>
                    <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                    </span>   
                    <span className='text-danger mx-2'>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
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
                <button type="button" class="mx-2 btn btn-primary addPost"><FontAwesomeIcon icon={faPlus}/></button>
                </span>
              </h3>
              <form>
              <textarea rows={4} type="text" className="form-control" placeholder='Your Thoughts...' id='nameField'/>
              <input type="file" name="uploadfile" className='d-none' id="img" /><label className='mt-2 mx-2 text-primary' for="img"><FontAwesomeIcon icon={faCamera} size="2x"></FontAwesomeIcon></label>
              </form>
          </div>
          </div>
        </div>
      </div>
      </div>
      <div className="row">

      </div>
    </div>
  )
}
