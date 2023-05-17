import React, { Fragment, useEffect, useState } from 'react'
import '../ScssFile/PromptingAccountCreation.scss'
import CloseIcon from '@mui/icons-material/Close';
function PromptingAccountCreation(props) {
  const setPromptingAccountCreation = props.setPromptingAccountCreation
  useEffect(() => {
     document.body.style.overflow = 'hidden';
     setPromptingAccountCreation(true)
     return () => {
         document.body.style.overflow = 'auto';
         setPromptingAccountCreation(false)
     };
  },[])
  return (
    <Fragment>
      <div className='back_display2'></div>
      <div className='prompting_login'>
        <div className='container'>
            <h2>この操作を行うにはログインする必要があります。アカウントを持ってない場合は新規登録をしてください。</h2>
            <button className='login'>ログイン</button>
            <button className='new'>新規登録</button>
            <div className='close' onClick={() => setPromptingAccountCreation(false)}><a><CloseIcon /></a></div>
        </div>
      </div>
    </Fragment>
  )
}

export default PromptingAccountCreation