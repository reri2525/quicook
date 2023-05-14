import React, { Fragment, useState } from 'react';
import '../ScssFile/Main.scss'
import Header from './Header';
import Postform from './Postform';
import List from './List';
function Main(props) {
const [postmodal, setPostmodal] = useState(false); 
  if (props.loggedInStatus === 'ログインなう') {
    return (
      <Fragment>
      <body>
       <Header loggedInStatus={props.loggedInStatus} handleLogout={props.handleLogout} 
                                                        setPostmodal={setPostmodal}  user={props.user}
                                                        setCurrentPage={props.setCurrentPage} pagecount={props.pagecount} 
                                                        />
     
        <List />
        <div className='center'>
         <div className='center_inner'>
          <div className='center_container'>
            {props.url}
          </div>
         </div>
        </div>
        { postmodal ? <Postform setPostmodal={setPostmodal} user={props.user}
         postAllGet={props.postAllGet}/> : <></> }
     </body>
    </Fragment>
    )
  } else if (props.loggedInStatus === '未ログイン') {
    props.history.push("/")
 }
}
export default Main;
