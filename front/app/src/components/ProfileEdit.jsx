import React, { useState, useEffect, Fragment } from 'react'
import '../ScssFile/ProfileEdit.scss'
import WarnModal from './WarnModal'
import axios from 'axios'
import { url } from "../config";
function ProfileEdit(props) {
 const user = props.user
 const [update, setUpdate] = useState(false)
 const [errors, setErrors] = useState(null)
 const [name, setName] = useState(user.name)
 const [nameChange, setNameChange]= useState(user.name)
 const [introduction, setIntroduction] = useState(user.introduction)
 const [email, setEmail] = useState(user.email)
 const [avatar, setAvatar] = useState(null)
 const [avatarPreview, setAvatarPreview] = useState(user.avatar.url)
 const [password, setPassword] = useState("")
 const [passwordConfirmation, setPasswordConfirmation] = useState("")
 const [warnModal, setWarnModal] = useState(false)
 const [warnType, setWarnType] = useState("acountDestroy")
 const onSubmit = (event) => {
  console.log(user.id)
  event.preventDefault()
  const formData = new FormData();
  formData.append('user[name]', name);
  if (avatar) {formData.append('user[avatar]', avatar)}
  formData.append('user[introduction]', introduction);
  formData.append('user[email]', email);
  formData.append('user[password]', password);
  formData.append('user[password_confirmation]', passwordConfirmation);
  axios.put(`${url}/users/${user.id}`, formData)
    .then(response => {
      if (response.data.status) {
        const data = response.data
        user.name = data.user.name
        user.introduction = data.user.introduction
        user.email = data.user.email
        user.avatar = data.user.avatar
        setNameChange(data.user.name)
        setErrors(false)
        setUpdate(true)
        setTimeout(function() {
          setUpdate(false);
        }, 8000);
        window.scrollTo(0, 0);
      } else {
        console.log("error")
        setErrors(true)
        setUpdate(false)
        window.scrollTo(0, 0);
      }
      }).catch(error => {
        console.log("error")
        setErrors(true)
        setUpdate(false)
        window.scrollTo(0, 0);
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
 const handleDestroy = () => {
  setWarnModal(true)
 }
 useEffect(() => {
   if (warnModal) {
     document.body.style.overflow = 'hidden';
   } else {
     document.body.style.overflow = 'auto';
   }
 }, [warnModal])
 return (
  <Fragment>
    <div className='edit'>
      <div className='edit_container'>
        <form onSubmit={onSubmit}>
         { update ? <h3 className='update'>変更されました。</h3> : <></> }
         { errors ? <h3 className='errors'></h3> : <></> }
         <div className='icon'>
         <img className='image'
           src={avatarPreview}>
         </img>
         </div>
         <h3>{nameChange}</h3>
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
         <button type='submit' className='save_button'>保存する</button>
         <button type='button' className='acount_destroy_button' onClick={() => handleDestroy()}>アカウント削除</button>
        </form>
      </div>
    </div>
    { warnModal ? <WarnModal setWarnModal={setWarnModal} warnType={warnType} user={user}/> : <></> }
  </Fragment>
  )
}

export default ProfileEdit