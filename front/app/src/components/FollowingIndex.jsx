import React, { Fragment, useEffect, useState } from 'react'
import '../ScssFile/FollowingIndex.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
function FollowingIndex(props) {
  const user = props.user
  const currentUser = props.currentUser
  const setFollowingIndexModal = props.setFollowingIndexModal
  const [following, setFollowing] = useState([])
  const [relationship, setRelationship] = useState([])
  useEffect(() => {
    openFollowModal(user.id)
  }, [])
  const openFollowModal = (id) => {
    axios.get(`http://localhost:3001/following/${id}`)
    .then(response => {
      const data = response.data
      setFollowing(data.following)
      setRelationship(true)
      setRelationship(new Array(data.count).fill(true));
      setTimeout(() => {
        console.log(relationship);
      }, 6000);
      console.log(data.following)
      console.log(data.count)
    })
  }

  const handleRelationship = (id, key) => {
    if (relationship[key]) {
     relationshipDestroy(id, key)
    } else {
     relationshipCreate(id, key)
    }
  }

  const relationshipCreate = (id, key) => {
    axios.post("http://localhost:3001/relationships",  { user_id: id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー")
        setRelationship(prevState => {
          return { ...prevState, [key]: true };
        });
        setTimeout(() => {
          console.log(relationship);
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
        setRelationship(prevState => {
          return { ...prevState, [key]: false };
        });
        setTimeout(() => {
          console.log(relationship);
        }, 6000);
      }
    })
    .catch(error => {
      console.log("エラー")
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
                <Link to={`/profile/${value.id}`} onClick={() => closeModal()} className='user_name'><a>{value.name}</a></Link>
                { currentUser.id === value.id ? 
                  <></>
                  : 
                  relationship[key] ?
                    <a className="unfollow" onClick={() => handleRelationship(value.id, key)}>フォロー中</a>
                      :
                    <a className="follow" onClick={() => handleRelationship(value.id, key)}>フォローする</a>
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