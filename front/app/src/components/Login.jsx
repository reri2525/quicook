import React, { Fragment, useState } from 'react';
import '../ScssFile/Login.scss'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
function Logmodal(props) {
  const {
     register,
     handleSubmit,
     formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors_m, setErrors_m] = useState("")
  const ref = document.referrer
  const history = useHistory();
  const CloseModal = () => {
    props.setLogmodal(false)
    props.setModal(false)
    setErrors_m("")
  }
  const onSubmit = (event) => {
    const formData = new FormData();
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    axios.post("http://localhost:3001/login",formData,
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
if (props.loggedInStatus === "未ログイン") {
return ( 
  <>{props.logmodal ? (
    <Fragment>
        <div className="back_display">
          
        </div>
        <div className="form_modal">
          
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
                <button className='btn' type="submit">送信</button><br></br>
                <span>{errors_m}</span>
               <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
            </form>
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