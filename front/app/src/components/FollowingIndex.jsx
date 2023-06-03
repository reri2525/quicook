import React, { Fragment, useEffect, useState } from 'react'
import '../ScssFile/FollowingIndex.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { url } from "../config";
function FollowingIndex(props) {
  const loggedInStatus = props.loggedInStatus
  const user = props.user
  const currentUser = props.currentUser
  const setFollowingIndexModal = props.setFollowingIndexModal
  const setPromptingAccountCreation = props.setPromptingAccountCreation
  const [following, setFollowing] = useState([])
  useEffect(() => {
    openFollowModal(user.id)
  }, [])
  const openFollowModal = (id) => {
    axios.get(`${url}/following/${id}`, { withCredentials: true })
    .then(response => {
      const data = response.data
      setFollowing(data.following)
      console.log(data.following)
      console.log(data.count)
    })
  }

  const handleRelationship = (value, key) => {
    if (value.following) {
     relationshipDestroy(value.id, key)
    } else {
     relationshipCreate(value.id, key)
    }
  }

  const relationshipCreate = (id, key) => {
   if (loggedInStatus === "ログインなう") {
    axios.post("http://localhost:3001/relationships",  { user_id: id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー")
        openFollowModal(user.id)
      }
    })
    .catch(error => {
      console.log(error, "エラー")
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const relationshipDestroy = (id, key) => {
    axios.delete(`http://localhost:3001/relationships/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー解除")
        openFollowModal(user.id)
      }
    })
    .catch(error => {
      console.log(error, "エラー")
   })
  }

  const closeModal = () => {
    setFollowingIndexModal(false)
  }

  return (
   <Fragment>
    <div className='back_display2'></div>
    <div className='following_index_modal'>
      <h3>フォロー中</h3>
      <div className='following_innner'>
          {following.map((value, key) => {
            return (
             <Fragment>
               <div className='following_content'>
                <div className='icon'>
                 <img src={value.avatar.url}></img>
                </div>
                <Link to={`/profile/${value.id}/page/1`} onClick={() => closeModal()} className='user_name'><a>{value.name}</a></Link>
                { currentUser.id === value.id ? 
                  <></>
                  : 
                  value.following && currentUser.id ?
                    <a className="unfollow" onClick={() => handleRelationship(value, key)}>フォロー中</a>
                      :
                    <a className="follow" onClick={() => handleRelationship(value, key)}>フォローする</a>
                }
               </div>
             </Fragment>
            )
          })}
      </div>
      <div className='close' onClick={() => closeModal()}><a><CloseIcon /></a></div>
    </div>
   </Fragment>
  )
}

export default FollowingIndex