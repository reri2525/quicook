import React, { useState, useEffect, Fragment } from 'react';
import '../ScssFile/Profile.scss'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import FollowingIndex from './FollowingIndex';
import FollowersIndex from './FollowersIndex';
function Profile(props) {
  const relationshipCreate = props.relationshipCreate
  const relationshipDestroy = props.relationshipDestroy
  const [user, setUser] = useState([])
  const [relationship, setRelationship] = useState([])
  const [follow, setFollow] = useState([])
  const [follower, setFollower] = useState([])
  const [postsCount, setPostsCount] = useState([])
  const [followingIndexModal, setFollowingIndexModal] = useState(false)
  const [followersIndexModal, setFollowersIndexModal] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    openPlofile(id)
  }, [id])
  const openPlofile = (id) => {
    axios.get(`http://localhost:3001/users/${id}`, { withCredentials: true })
    .then(response => {
        const data = response.data
        setUser(data.user)
        setFollow(data.followed_count)
        setFollower(data.follower_count)
        setRelationship(data.relationship)
        setPostsCount(data.posts_count)
        console.log(data)
    }).catch(error => console.log("ユーザーいない"))
  }
  const handleRelationship = (id) => {
    if (relationship) {
     setRelationship(false)
     setFollower(follower - 1)
     relationshipDestroy(id)
    } else {
     setRelationship(true)
     setFollower(follower + 1)
     relationshipCreate(id)
    }
  }
  if (user.name) {
  return (
   <Fragment>
    <div className='profile_container'>
      <div className='icon'>
       <img className='image'
         src={user.avatar.url}>
       </img>
      </div>
      <div className='explanation'>
        <a className='user_name'>{user.name}</a>
        { user.id === props.user.id ? 
          <Link to="/edit" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <a className='edit_profile'>プロフィール編集</a>
          </Link> 
            : 
          relationship ?
              <a className="unfollow" onClick={() => handleRelationship(user.id)}>フォロー中</a>
                :
              <a className="follow" onClick={() => handleRelationship(user.id)}>フォローする</a>
        }
        <div className='user_data'>
         <a>投稿  {postsCount ? postsCount : 0 } 件</a>
         <a className='follow_modal' onClick={() => setFollowingIndexModal(true)}>フォロー {follow ? follow : 0 } 人</a>
         <a className='follow_modal' onClick={() => setFollowersIndexModal(true)}>フォロワー {follower ? follower : 0 } 人</a>
         <p>{user.introduction}</p>
        </div>
      </div>
    </div>
    { followingIndexModal ? <FollowingIndex user={user} currentUser={props.user} setFollowingIndexModal={setFollowingIndexModal} /> : <></>}
    { followersIndexModal ? <FollowersIndex user={user} currentUser={props.user} setFollowersIndexModal={setFollowersIndexModal} /> : <></>}
   </Fragment>
  )
  }
}

export default Profile