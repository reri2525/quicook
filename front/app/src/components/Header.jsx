import React, { Fragment, useState } from 'react';
import axios from 'axios';
import '/usr/src/app/app/src/App.scss';
import '/usr/src/app/app/src/Responsive.scss';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
function Header(props) {
 const user = props.user
 const [searchQuery, setSearchQuery] = useState("")
 const history = useHistory();
 const ShowLogModal = () => {
  props.setLogmodal(true)
  props.setModal(true)
 }
 const ShowNewModal = () => {
  props.setNewmodal(true)
  props.setModal(true)
 }
 const ShowPostModal = () => {
  props.setPostmodal(true)
 }
 const postSearch = (search) => {
    props.setSearching(search)
    props.setCurrentPage(1)
    setTimeout(() => {
      history.push(`/search/${search}`)
    }, 0)
}
if (props.loggedInStatus === '未ログイン') {
return (
    <header>
        <Link to="/" className="main_title title_link">Quicook</Link>
        
        <a className="log" onClick={() => ShowLogModal()}>ログイン</a>
        <a className="log" onClick={() => ShowNewModal()}>新規登録</a>
      
    </header>
    );
} else if (props.loggedInStatus === 'ログインなう') {
return (
    <header className="header_login">
      <Link to="/home" className="main_title title_link">Quicook</Link>
      <Link to={`/profile/${user.id}`} className={window.location.pathname == `/profile/${user.id}` ? 'onprofile' : 'profile'}>
      <img className='image'
        src={user.avatar.url}>
      </img>
        プロフィール</Link>
      <form className='search' onSubmit={event => event.preventDefault()}>
        <input  
           placeholder="レシピを探す"
           value={searchQuery}
           onChange={event => setSearchQuery(event.target.value)}
        >
        </input>
        <a onClick={() => setSearchQuery("")}><CloseIcon /></a>
        <button className='sarch_btn' onClick={() => searchQuery && postSearch(searchQuery)}><SearchIcon /></button>
      </form>
      <a className="log" onClick={() => props.handleLogout()}>ログアウト</a>
      <a className='postbutton' onClick={() => ShowPostModal()}>投稿する</a>
    </header>
);
}

}
export default Header;