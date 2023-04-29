import React, { Fragment, useState } from 'react';
import Header from './Header';
import '../ScssFile/Top.scss'
import Footer from './Footer';
import Logmodal from './Login';
import Newmodal from './New';
function Top(props) {
  const [logmodal, setLogmodal] = useState(false);
  const [newmodal, setNewmodal] = useState(false);
  const [modal, setModal] = useState(false);
  const [postmodal, setPostmodal] = useState(false); 
  const [scroll, setScroll] = useState(false); 


  if (props.loggedInStatus === '未ログイン') {
 return (
  <Fragment>
  <body>
  <Header loggedInStatus={props.loggedInStatus} setLogmodal={setLogmodal} setNewmodal={setNewmodal} setModal={setModal} />
    <div className='top'>
     <div className='container'>
      <h1>Quicook..</h1>
      <h3>３分で作れるお手軽料理</h3>
      <img className='top_photo' src='http://illust-ryokka.jp/wp-content/uploads/2017/12/Cuisine-16.png'></img>
     </div>
    </div>
  </body>
  <Logmodal handleLogin={props.handleLogin} logmodal={logmodal} setLogmodal={setLogmodal} setModal={setModal} loggedInStatus={props.loggedInStatus}/>
  <Newmodal handleLogin={props.handleLogin} newmodal={newmodal} setNewmodal={setNewmodal} setModal={setModal} loggedInStatus={props.loggedInStatus}/>
  <Footer />
 </Fragment>
  );
 } else if (props.loggedInStatus === 'ログインなう') {
  props.history.push("/home")
 }
}
 export default Top;