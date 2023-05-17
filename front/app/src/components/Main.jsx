import React, { Fragment, useState } from 'react';
import '../ScssFile/Main.scss'
import Header from './Header';
import Postform from './Postform';
import List from './List';
import Footer from './Footer';
import Logmodal from './Login';
import Newmodal from './New';
import PromptingAccountCreation from './PromptingAccountCreation';
function Main(props) {
  const loggedInStatus = props.loggedInStatus
  const [postModal, setPostModal] = useState(false); 
  const [logModal, setLogModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [modal, setModal] = useState(false);
    return (
      <Fragment>
      <body>
       <Header loggedInStatus={props.loggedInStatus} handleLogout={props.handleLogout} 
                                                        setPostModal={setPostModal}  user={props.user}
                                                        setLogModal={setLogModal} setNewModal={setNewModal} setModal={setModal} 
                                                        />
     
        <List />
        <div className='center'>
         <div className='center_inner'>
          <div className='center_container'>
            {props.url}
          </div>
         </div>
        </div>
         { postModal ? <Postform 
                        setPostmodal={setPostModal} user={props.user}
                        postAllGet={props.postAllGet}
                       /> : 
                       <></> 
         }
         { logModal ? <Logmodal 
                        handleLogin={props.handleLogin} logModal={logModal} 
                        setLogModal={setLogModal} setModal={setModal} loggedInStatus={props.loggedInStatus}
                      /> : 
                      <></>
         }
         { newModal ? <Newmodal 
                        handleLogin={props.handleLogin} newModal={newModal} 
                        setNewModal={setNewModal} setModal={setModal} loggedInStatus={props.loggedInStatus}
                      /> :
                      <></>
         }
         { loggedInStatus === "未ログイン" ? <Footer setLogModal={setLogModal} setNewModal={setNewModal}/> : <></> }
     </body>
    </Fragment>
    )
}
export default Main;
