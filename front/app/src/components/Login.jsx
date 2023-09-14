import React, { Fragment, useState, useEffect } from 'react';
import '../ScssFile/Login.scss'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { url } from "../config";
function Logmodal(props) {
  const {
     register,
     handleSubmit,
     formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors_m, setErrors_m] = useState("")
  const [passwordResetForm, setPasswordResetForm] = useState("")
  const [sentEmail, setSentEmail] = useState("")
  const history = useHistory();

  const CloseModal = () => {
    props.setLogModal(false)
    props.setModal(false)
    setErrors_m("")
  }

  const onSubmit = (event) => {
    const formData = new FormData();
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    axios.post(`${url}/login`,formData,
        { withCredentials: true }
    ).then(response => {
        if (response.data.logged_in) {
            props.handleLogin(response.data)
            history.push("/home/page/1")
        } else if (response.data.status === 401) {
            setErrors_m(response.data.errors)
            console.log("registration errorrrrr")
        }
    }).catch(error => {
        console.log("registration error", error)
        event.preventDefault()
    })
  }

  const handleSentEmail = (event) => {
    axios.get(`${url}/users/password_reset`, {params: {sent_email: sentEmail}})
   }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  },[])

  const PasswordReset = () => {
    setPasswordResetForm(true)
  }

if (props.loggedInStatus === "未ログイン") {
return ( 
  <>{props.logModal ? (
    <Fragment>
        <div className="back_display2">
          
        </div>
        <div className="form_modal">   
        { passwordResetForm ?
          <form className="form_sent_email">
             <h1>入力してください</h1>
             <label>送信用のメールアドレス</label><br></br>
             <input className='input_sent_email'
                type="email"
                value={sentEmail}
                onChange={event => setSentEmail(event.target.value)}
             /><br></br>
             <label>パスワードを再設定するためのメールを送ります。</label><br></br>
             <button className='btn' type="button" onClick={ () => handleSentEmail()}>送信</button><br/>
             <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
          </form>
           : 
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
             <h1>入力してください</h1>
                <label>メールアドレス</label><br></br>
                <input className='input'
                    type="email"
                    name="email"
                   
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                /><br></br>
                <label>パスワード</label><br></br>
                <input className='input'
                    type="password"
                    name="password"
                    
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                /><br></br>
                <button className='btn' type="submit">送信</button><br/>
                <a className='password_reset' onClick={() => PasswordReset()}>パスワードを忘れてしまった</a><br/>
                <span>{errors_m}</span>
               <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
          </form>
        }
        </div>  
        
    </Fragment>
) : (
    <></>
)}
</>
)
} else if (props.loggedInStatus === "ログインなう") {
    history.push("/loginwarn")
}
}



export default Logmodal;