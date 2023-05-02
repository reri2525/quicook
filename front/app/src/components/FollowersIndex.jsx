import React, { Fragment, useEffect, useState } from 'react'
import '../ScssFile/FollowersIndex.scss'
import axios from 'axios';
function FollowersIndex(props) {
  const user = props.user
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
    })
  }
  return (
   <Fragment>
    <div className='back_display2'></div>
    <div className='followers_index_modal'>
      <h3>フォロワー</h3>
      <div className='followers_innner'>
        <div className='followers_content'>
          {followers.map((value, key) => {
            return (
             <h1 key={key}>{value.name}</h1>
            )
          })}
        </div>
      </div>
    </div>
   </Fragment>
  )
}

export default FollowersIndex