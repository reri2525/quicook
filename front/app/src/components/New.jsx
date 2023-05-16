import React, { Fragment, useState, useEffect } from 'react';
import '../ScssFile/New.scss'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
function Newmodal(props) {
  const {
      register,
      reset,
      watch,
      handleSubmit,
      formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    });
  const name = watch('name', '')
  const email = watch('email', '')
  const password = watch('password', '')
  const passwordConfirmation = watch('passwordConfirmation', '')
  const ref = document.referrer

  const CloseModal = () => {
    props.setNewModal(false)
    props.setModal(false)
    reset();
  }

  const onSubmit = (event) => {
    axios.post("http://localhost:3001/users",
        {
            user: {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            }
        },
        { withCredentials: true }
    ).then(response => {
        if (response.data.status === 'created') {
            props.handleLogin(response.data)
            props.history.push("/home")
        } else if (response.data.status === 'no') {
            
        }
    }).catch(error => {
        console.log("registration error", error)
    })
    event.preventDefault()
}

useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = 'auto';
  };
},[])

return ( 
    <Fragment>
        <div className="back_display">
          
        </div>
        <div className="form_modal">
         <form className="form">
             <h1>入力してください</h1>
                <label>名前</label><br></br>
                <input className={errors.name ? 'input_errors' : 'input'}
                    type="name"
                    {...register('name', { required: true, maxLength: 20})}
                /><br></br>
                {errors.name?.type === 'required' && (
                  <div className='errors'>※名前が入力されていません</div>
                )}
                {errors.name?.type === 'maxLength' && (
                  <div className='errors'>※名前が長すぎます!</div>
                )}
                <label>メールアドレス</label><br></br>
                <input className={errors.email ? 'input_errors' : 'input'}
                    type="email"   
                    {...register('email', { required: true})}                     
                /><br></br>
                {errors.email?.type === 'required' && (
                  <div className='errors'>※メールアドレスが入力されていません</div>
                )}
                <label>パスワード</label><br></br>
                <input className={errors.password ? 'input_errors' : 'input'}
                    type="password"
                    {...register('password', { required: true, minLength: 6})}                     
                /><br></br>
                {errors.password?.type === 'required' && (
                  <div className='errors'>※パスワードが入力されていません</div>
                )}
                {errors.password?.type === 'minLength' && (
                  <div className='errors'>※パスワードが短すぎます!</div>
                )}
                <label>パスワード確認</label><br></br>
                <input className={errors.passwordConfirmation ? 'input_errors' : 'input'}
                    type="password"
                    {...register('passwordConfirmation', { required: true, minLength: 6})}                     
                /><br></br>
                {errors.passwordConfirmation?.type === 'required' && (
                  <div className='errors'>※パスワードが入力されていません</div>
                )}
                {errors.passwordConfirmation?.type === 'minLength' && (
                  <div className='errors'>※パスワードが短すぎます!</div>
                )}
                <button className='btn' type="button" onClick={handleSubmit(onSubmit)}>送信</button><br></br>
                <c>パスワードは英文字または数字で6桁以上入力してください</c><br></br>
               <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
            </form>
        </div>

          
    </Fragment>
)
}
export default Newmodal;