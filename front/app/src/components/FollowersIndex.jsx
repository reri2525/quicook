import React, { Fragment, useEffect, useState } from 'react'
import '../ScssFile/FollowersIndex.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
function FollowersIndex(props) {
  const user = props.user
  const currentUser = props.currentUser
  const setFollowersIndexModal = props.setFollowersIndexModal
  const [followers, setFollowers] = useState([])
  useEffect(() => {
    openFollowModal(user.id)
  }, [])
  const openFollowModal = (id) => {
    axios.get(`http://localhost:3001/followers/${id}`)
    .then(response => {
      const data = response.data
      setFollowers(data.followers)
      console.log(data.followers)
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
    axios.post("http://localhost:3001/relationships",  { user_id: id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー")
        openFollowModal(user.id)
        setTimeout(() => {
          console.log(followers);
        }, 6000);
      }
    })
    .catch(error => {
      console.log("エラー")
   })
  }

  const relationshipDestroy = (id, key) => {
    axios.delete(`http://localhost:3001/relationships/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log(response.data.post)
        openFollowModal(user.id)
        setTimeout(() => {
          console.log(followers);
        }, 6000);
      }
    })
    .catch(error => {
      console.log("エラー")
   })
  }

  const closeModal = () => {
    setFollowersIndexModal(false)
  }

  return (
   <Fragment>
    <div className='back_display2'></div>
    <div className='followers_index_modal'>
      <h3>フォロワー</h3>
      <div className='followers_innner'>
          {followers.map((value, key) => {
            return (
             <Fragment>
               <div className='followers_content'>
                <div className='icon'>
                 <img src={value.avatar.url}></img>
                </div>
                <Link to={`/profile/${value.id}`} onClick={() => closeModal()} className='user_name'><a>{value.name}</a></Link>
                { currentUser.id === value.id ? 
                  <></>
                  : 
                  value.following ?
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

export default FollowersIndex