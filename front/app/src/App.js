import Loginwarn from "./components/Loginwarn";
import React, { useState, useEffect } from 'react';
import './ScssFile/Share.scss'
import axios from'axios';
import { useHistory } from 'react-router-dom';
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
import{
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App(props) {
  const url = process.env.REACT_APP_API_URL
  const [loggedInStatus, setLoggedInStatus] = useState({})
  const [user, setUser] = useState({})
  const [promptingAccountCreation, setPromptingAccountCreation] = useState(false)
  const handleLogin = (data) => {
    window.location.pathname = "/";
  }
  const handleLogout = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(response => {
              window.location.pathname = "/";
            }).catch(error => 
              console.log("ログアウトエラー", error)
            )
  }
  const checkLoginStatus = () => {
    axios.get(`http://${url}/logged_in`,{ withCredentials: true })
    .then(response => {
      if (response.data.logged_in) {
        setLoggedInStatus("ログインなう")
        console.log("ログイン")
        setUser(response.data.user)
      } else if (!response.data.logged_in) {
        setLoggedInStatus("未ログイン")
        console.log("未ログイン")
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
   if (loggedInStatus === "ログインなう") {
    axios.post("http://localhost:3001/bookmarks",  { post_id: post.id }, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("ブックマーク作成")
      }
    })
    .catch(error => {
      console.log("ブックマーク作成エラー", error)
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const bookmarkDestroy = (post) =>{
    axios.delete(`http://localhost:3001/bookmarks/${post.id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("ブックマーク削除")
      }
    })
    .catch(error => {
      console.log("ブックマーク削除エラー", error)
   })
  }

  const heartCreate = (post) =>{
   if (loggedInStatus === "ログインなう") {
    axios.post("http://localhost:3001/hearts",  { post_id: post.id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("いいね作成")
      }
    })
    .catch(error => {
      console.log("いいね削除エラー", error)
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const heartDestroy = (post) =>{
    axios.delete(`http://localhost:3001/hearts/${post.id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("いいね削除")
      }
    })
    .catch(error => {
      console.log("いいね削除エラー", error)
   })
  }
  const relationshipCreate = (id) => {
   if (loggedInStatus === "ログインなう") {
    axios.post("http://localhost:3001/relationships",  { user_id: id },  { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー")
      }
    })
    .catch(error => {
      console.log("フォローエラー", error)
    })
   } else {
    setPromptingAccountCreation(true)
   }
  }
  const relationshipDestroy = (id) => {
    axios.delete(`http://localhost:3001/relationships/${id}`, { withCredentials: true })
    .then(response => {
      if (response.data.status) {
        console.log("フォロー解除")
      }
    })
    .catch(error => {
      console.log("フォロー解除エラー", error)
   })
  }
  return (
     <Router>
      <Switch>
        <Route exact path={"/top"}
             render={props => (
              <Top { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                user={user} handleLogout={handleLogout}/>
            )}
          />  
        <Route exact path={"/"}
             render={props => (
              props.history.push('/home/page/1')
            )}
          />  
         <Route exact path={"/home/page/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} handleLogout={handleLogout}   
                                 promptingAccountCreation={promptingAccountCreation}
                                 setPromptingAccountCreation={setPromptingAccountCreation}
                                 url={<Home loggedInStatus={loggedInStatus} 
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 user={user} relationshipCreate={relationshipCreate} relationshipDestroy={relationshipDestroy}
                                 />}/>
            )}
          />  
          <Route exact path={"/posts/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} handleLogout={handleLogout}   
                                 promptingAccountCreation={promptingAccountCreation}
                                 setPromptingAccountCreation={setPromptingAccountCreation}
                                 url={<PostShow user={user} relationshipCreate={relationshipCreate} 
                                                relationshipDestroy={relationshipDestroy}  bookmarkCreate={bookmarkCreate} 
                                                bookmarkDestroy={bookmarkDestroy} heartCreate={heartCreate} 
                                                heartDestroy={heartDestroy} loggedInStatus={loggedInStatus}
                                                />}/>
            )}
          />  
          <Route exact path={"/following/page/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} handleLogout={handleLogout}      
                                 url={<Following bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                                 user={user} 
                                                 />}/>
            )}
          />  
          <Route exact path={"/bookmark/page/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} handleLogout={handleLogout}             
                                 url={<Bookmark bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                                heartCreate={heartCreate} heartDestroy={heartDestroy}
                                                />}/>
            )}
          />  
          <Route exact path={"/category/:query/page/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} handleLogout={handleLogout}   
                                 promptingAccountCreation={promptingAccountCreation}
                                 setPromptingAccountCreation={setPromptingAccountCreation}
                                 url={<Category loggedInStatus={loggedInStatus} 
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 user={user} relationshipCreate={relationshipCreate} relationshipDestroy={relationshipDestroy}
                                 />}/>
            )}
          />  
          <Route exact path={"/search/:query/page/:id"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus}
                                 user={user} handleLogout={handleLogout}   
                                 promptingAccountCreation={promptingAccountCreation}
                                 setPromptingAccountCreation={setPromptingAccountCreation}
                                 url={<Search loggedInStatus={loggedInStatus} 
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 user={user} relationshipCreate={relationshipCreate} relationshipDestroy={relationshipDestroy}
                                 />}/>
            )}
          />  
        <Route exact path={"/profile/:id/page/:number"}
             render={props => (
              <Main { ...props } handleLogin={handleLogin} loggedInStatus={loggedInStatus} 
                                 handleLogout={handleLogout} user={user} 
                                 promptingAccountCreation={promptingAccountCreation}
                                 setPromptingAccountCreation={setPromptingAccountCreation}
                                 url={<Profile loggedInStatus={loggedInStatus} 
                                 bookmarkCreate={bookmarkCreate} bookmarkDestroy={bookmarkDestroy}
                                 heartCreate={heartCreate} heartDestroy={heartDestroy}
                                 user={user} relationshipCreate={relationshipCreate} relationshipDestroy={relationshipDestroy}
                                 />}/>
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
