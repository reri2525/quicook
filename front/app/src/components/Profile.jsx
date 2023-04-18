import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
function Profile(props) {
  const [user, setUser] = useState([])
  const { id } = useParams();
  useEffect(() => {
    openPlofile(id)
  }, [])
  const openPlofile = (id) => {
    axios.get(`http://localhost:3001/users/${id}`, { withCredentials: true })
    .then(response => {
        setUser(response.data.user)
    }).catch(error => console.log("ユーザーいない"))
  }
  if (user.name) {
  return (
    <div className='profile_container'>
      <div className='icon'>
       <img className='image'
         src={user.avatar.url}>
       </img>
      </div>
      <div className='explanation'>
        <a className='user_name'>{user.name}</a>
        { user.id === props.user.id ? 
          <Link to="/edit" className='edit_profile'>プロフィール編集</Link> 
            : 
          <a className='follow'>フォローする</a>
        }
        <div className='user_data'>
         <a>投稿　149 件</a>
         <a>フォロー 149 人</a>
         <a>フォロワー 149 人</a>
        </div>
      </div>
    </div>
  )
  }
}

export default Profile