import React, { useState } from 'react'
import axios from 'axios'
function ProfileEdit(props) {
 const user = props.user
 const [name, setName] = useState(user.name)
 const [introduction, setIntroduction] = useState(user.introduction)
 const [email, setEmail] = useState(user.email)
 const [avatar, setAvatar] = useState(user.avatar)
 const [avatarPreview, setAvatarPreview] = useState(user.avatar.url)
 const [password, setPassword] = useState("")
 const [passwordConfirmation, setPasswordConfirmation] = useState("")
 const onSubmit = (event) => {
  event.preventDefault()
  const formData = new FormData();
  formData.append('user[name]', name);
  formData.append('user[introduction]', introduction);
  formData.append('user[email]', email);
  formData.append('user[password]', password);
  formData.append('user[password_confirmation]', passwordConfirmation);
  axios.put(`http://localhost:3001/users/${user.id}`, formData)
    .then(response => {
      if (response.data.status) {
        const data = response.data
        setName(data.name)
        setIntroduction(data.introduction)
        setEmail(data.email)
      } else {
        console.log("error")
      }
      }).catch(error => {
        console.log("error")
      })
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
         <h3>{name}</h3>
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
          value={name}
          onChange={event => setName(event.target.value)}
         /><br/>
         <label>自己紹介</label><br/>
         <textarea className='self_introduction'
          value={introduction}
          onChange={event => setIntroduction(event.target.value)}
         /><br/>
         <label>メールアドレス</label><br/>
         <input className='email'
           value={email}
           onChange={event => setEmail(event.target.value)}
         /><br/>
         <label>パスワード</label><br/>
         <input className='password'
           value={password}
           onChange={event => setPassword(event.target.value)}
         /><br/>
         <label>パスワード確認</label><br/>
         <input className='password'
           value={passwordConfirmation}
           onChange={event => setPasswordConfirmation(event.target.value)}
         /><br/>
         <button type='submit'>保存する</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit