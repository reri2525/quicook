import Loginwarn from "./components/Loginwarn";
import React, { useState, useEffect } from 'react';
import './ScssFile/Share.scss'
import { useHistory } from "react-router-dom";
import axios from'axios';
import Top from './components/Top'
import Main from "./components/Main";
import Home from "./components/Home";
import PostShow from "./components/PostShow";
import Bookmark from './components/Bookmark'; 
import Search from './components/Search';
import Category from './components/Category'
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import Following from './components/Following';
import WarnModal from './components/WarnModal';
import FollowersIndex from './components/FollowersIndex'
import {ListUrl} from './components/ListUrl';
import{
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App(props) {
  const [modal, setModal] = useState(false); 
  const [loggedInStatus, setLoggedInStatus] = useState({})
  const [user, setUser] = useState({})
  const [postall, setPostall] = useState({})
  const [pagecount, setPagecount] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [searching, setSearching] = useState("")
  const history = useHistory();
  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう")
    setUser(data.user)
  }
  const handleLogout = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(response => {
              setLoggedInStatus("未ログイン")
              setUser({})
              window.location.reload();
            }).catch(error => console.log("ログアウトエラー", error))
  }
  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in",{ withCredentials: true })
    .then(response => {
      if (response.data.logged_in) {
        setLoggedInStatus("ログインなう")
        console.log(loggedInStatus)
        setUser(response.data.user)
      } else if (!response.data.logged_in) {
        setLoggedInStatus("未ログイン")
        console.log(loggedInStatus)
        setUser({})
      }
    })

    .catch(error => {
      console.log("ログインエラー", error)
   })
  }
  // 追加
  useEffect(() => {
    checkLoginStatus()
  }, [])
  


  
  const bookmarkCreate = (post) =>{
    axios.post("http://localhost:3001/bookmarks",  { post_id: post.id }, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("ブックマーク作成")
      }
    })
    .catch(error => {
      console.log("b")
   })
  }
  const bookmarkDestroy = (post) =>{
    axios.delete(`http://localhost:3001/bookmarks/${post.id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log(response.data.post)
      }
    })
    .catch(error => {
      console.log("b")
   })
  }
  const heartCreate = (post) =>{
    axios.post("http://localhost:3001/hearts",  { post_id: post.id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log(response.data.post)
      }
    })
    .catch(error => {
      console.log("b")
   })
  }
  const heartDestroy = (post) =>{
    axios.delete(`http://localhost:3001/hearts/${post.id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log(response.data.post)
      }
    })
    .catch(error => {
      console.log("b")
   })
  }
  const relationshipCreate = (id) => {
    axios.post("http://localhost:3001/relationships",  { user_id: id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー")
      }
    })
    .catch(error => {
      console.log("エラー")
   })
  }
  const relationshipDestroy = (id) => {
    axios.delete(`http://localhost:3001/relationships/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log(response.data.post)
      }
    })
    .catch(error => {
      console.log("エラー")
   })
  }
  return (
     <Router>
      <Switch>
       <Route exact path={"/loginwarn"}>
         <Loginwarn />
       </Route>
       <Route exact path={"/warn"}>
         <WarnModal />
       </Route>
       <Route exact path={"/follower"}>
         <FollowersIndex />
       </Route>
        <Route exact path={"/"}
             render={props => (
              <Top { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus} handleLogout={handleLogout}/>
            )}
          />  
         <Route exact path={"/home/page/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} postall={postall} handleLogout={handleLogout}   
                                 setCurrentPage={setCurrentPage} pagecount={pagecount}    
                                 setSearching={setSearching}                
                                 url={<Home postall={postall} currentPage={currentPage} 
                                 pagecount={pagecount} setCurrentPage={setCurrentPage}
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 user={user} relationshipCreate={relationshipCreate} relationshipDestroy={relationshipDestroy}
                                 />}/>
            )}
          />  
          <Route exact path={"/posts/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} postall={postall} handleLogout={handleLogout}   
                                 setCurrentPage={setCurrentPage} pagecount={pagecount}    
                                 setSearching={setSearching}                
                                 url={<PostShow user={user} relationshipCreate={relationshipCreate} 
                                                relationshipDestroy={relationshipDestroy}  bookmarkCreate={bookmarkCreate} 
                                                bookmarkDestroy={bookmarkDestroy} heartCreate={heartCreate} 
                                                heartDestroy={heartDestroy}
                                                />}/>
            )}
          />  
          <Route exact path={"/follow"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} postall={postall} handleLogout={handleLogout}   
                                 setCurrentPage={setCurrentPage} pagecount={pagecount}    
                                 setSearching={setSearching}                
                                 url={<Following postall={postall} currentPage={currentPage} 
                                 pagecount={pagecount} setCurrentPage={setCurrentPage}
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 user={user} 
                                 />}/>
            )}
          />  
          <Route exact path={"/bookmark"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} postall={postall} handleLogout={handleLogout}                            
                                 url={<Home postall={postall} currentPage={currentPage} 
                                 pagecount={pagecount} setCurrentPage={setCurrentPage}
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 />}/>
            )}
          />  
          <Route exact path={"/category/:category_query"}
             render={props => (
              <Category { ...props } />
            )}
          />  
          <Route exact path={"/search/:search_query"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} postall={postall} handleLogout={handleLogout}   
                                 setCurrentPage={setCurrentPage} pagecount={pagecount}  
                                 setSearching={setSearching}                
                                 url={<Search postall={postall} currentPage={currentPage} 
                                 pagecount={pagecount} setCurrentPage={setCurrentPage}
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 user={user} searching={searching}
                                 />}/>
            )}
          />  
        <Route exact path={"/profile/:id/page/:number"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus} 
                                 handleLogout={handleLogout} user={user} 
                                 url={<Profile user={user} relationshipCreate={relationshipCreate} 
                                       relationshipDestroy={relationshipDestroy} bookmarkCreate={bookmarkCreate} 
                                       bookmarkDestroy={bookmarkDestroy} heartCreate={heartCreate} 
                                       heartDestroy={heartDestroy}/>
                                      }/>
            )}
          />  
        <Route exact path={"/edit"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus} handleLogout={handleLogout} user={user} url={<ProfileEdit  user={user}/>}/>
            )}
          />  
      </Switch>
    </Router>
  );
}

export default App;
