import axios from 'axios'
import React, { useState } from 'react'
function ProfileEdit(props) {
 const user = props.user
 const [name, setName] = useState(user.name)
 const [email, setEmail] = useState(user.email)
 const [avatar, setAvatar] = useState(user.avatar)
 const [avatarPreview, setAvatarPreview] = useState(user.avatar.url)
 const onSubmit = (event) => {
  axios.get(`http://localhost:3005/users/${props.user.id}/edit`)
 }
 const filechange = (event) => {
  setAvatar(event.target.files[0])
  const reader = new FileReader()
       reader.onload = (event) => {
           setAvatarPreview(event.target.result)
       };
       reader.readAsDataURL(event.target.files[0])
 }
 return (
    <div className='edit'>
      <div className='edit_container'>
        <form onSubmit={onSubmit}>
         <div className='icon'>
         <img className='image'
           src={avatarPreview}>
         </img>
         </div>
         <h3>{user.name}</h3>
         <label className='icon_edit'>
           プロフィール写真の編集
           <input type='file' 
             className='image_input'
             accept='image/*'
             onChange={filechange}
           />
         </label><br/>
         <label>名前</label><br/>
         <input className='name'
          value={user.name}
         /><br/>
         <label>自己紹介</label><br/>
         <textarea className='self_introduction'
          
         /><br/>
         <label>メールアドレス</label><br/>
         <input className='email'
          value={user.email}
         /><br/>
         <label>パスワード</label><br/>
         <input className='password'
          
         /><br/>
         <label>パスワード確認</label><br/>
         <input className='password'
          
         /><br/>
         <button type='button'>保存する</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit