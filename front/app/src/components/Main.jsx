import React, { Fragment, useState, useContext} from 'react';
import { MainContext } from '../App';
import '../ScssFile/Main.scss'
import Header from './Header';
import PostForm from './Postform';
import List from './List';
import Footer from './Footer';
import Logmodal from './Login';
import Newmodal from './New';
import PromptingAccountCreation from './PromptingAccountCreation';
function Main(props) {
  const context = useContext(MainContext)
  const promptingAccountCreation = context.promptingAccountCreation
  const setPromptingAccountCreation = context.setPromptingAccountCreation
  const loggedInStatus = context.loggedInStatus
  const handleLogout = context.handleLogout
  const user = context.user
  const [postModal, setPostModal] = useState(false); 
  const [logModal, setLogModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null)

    return (
      <Fragment>
      <body>
       { flashMessage && 
         <div>
           <h2 className='flash_message'>{flashMessage}</h2> 
         </div>
       }
       <Header loggedInStatus={loggedInStatus} handleLogout={handleLogout} 
                                                        setPostModal={setPostModal}  user={user}
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
