import React, { Fragment, useState } from 'react';
import '../ScssFile/Main.scss'
import Header from './Header';
import PostForm from './Postform';
import List from './List';
import Footer from './Footer';
import Logmodal from './Login';
import Newmodal from './New';
import PromptingAccountCreation from './PromptingAccountCreation';
import CloseIcon from '@mui/icons-material/Close';
import { getBottomNavigationUtilityClass } from '@mui/material';
function Main(props) {
  const promptingAccountCreation = props.promptingAccountCreation
  const setPromptingAccountCreation = props.setPromptingAccountCreation
  const loggedInStatus = props.loggedInStatus
  const [postModal, setPostModal] = useState(false); 
  const [logModal, setLogModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null)

  const CloseFlash = () => {
    setFlashMessage(null)
  }
    return (
      <Fragment>
      <body>
       { flashMessage && 
         <div>
           <h2 className='flash_message'>{flashMessage}</h2> 
           <div className='close_falsh' onClick={() => CloseFlash()}><a><CloseIcon /></a></div>
         </div>
       }
       <Header loggedInStatus={props.loggedInStatus} handleLogout={props.handleLogout} 
                                                        setPostModal={setPostModal}  user={props.user}
                                                        setLogModal={setLogModal} setNewModal={setNewModal} setModal={setModal} 
                                                        />
        <List loggedInStatus={loggedInStatus}/>
        <div className='center'>
         <div className='center_inner'>
          <div className='center_container'>
            {props.url}
          </div>
         </div>
        </div>
         { postModal ? <PostForm 
                        setPostmodal={setPostModal} user={props.user}
                        postAllGet={props.postAllGet}
                       /> : 
                       <></> 
         }
         { logModal ? <Logmodal 
                        handleLogin={props.handleLogin} logModal={logModal} setFlashMessage={setFlashMessage}
                        setLogModal={setLogModal} setModal={setModal} loggedInStatus={props.loggedInStatus}
                      /> : 
                      <></>
         }
         { newModal ? <Newmodal 
                        handleLogin={props.handleLogin} newModal={newModal} setFlashMessage={setFlashMessage}
                        setNewModal={setNewModal} setModal={setModal} loggedInStatus={props.loggedInStatus}
                      /> :
                      <></>
         }
         { promptingAccountCreation ? <PromptingAccountCreation setPromptingAccountCreation={setPromptingAccountCreation}
                                                                setLogModal={setLogModal}
                                                                setNewModal={setNewModal}
                                                                /> : <></> } 
         { loggedInStatus === "未ログイン" ? <Footer setLogModal={setLogModal} setNewModal={setNewModal}/> : <></> }
     </body>
    </Fragment>
    )
}
export default Main;
