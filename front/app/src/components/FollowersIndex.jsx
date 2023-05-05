import React, { Fragment, useEffect, useState } from 'react'
import '../ScssFile/FollowersIndex.scss'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
function FollowersIndex(props) {
  const user = props.user
  const setFollowersIndexModal = props.setFollowersIndexModal
  const [followers, setFollowers] = useState([])
  const [relationship, setRelationship] = useState([])
  useEffect(() => {
    openFollowModal(user.id)
  }, [])
  const openFollowModal = (id) => {
    axios.get(`http://localhost:3001/followers/${id}`)
    .then(response => {
      const data = response.data
      setFollowers(data.followers)
      setRelationship(true)
      setRelationship(new Array(data.count).fill(true));
      setTimeout(() => {
        console.log(relationship);
      }, 6000);
      console.log(data.followers)
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
                <a key={key}>{value.name}</a>
                { user.id === value.id ? 
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

export default FollowersIndex