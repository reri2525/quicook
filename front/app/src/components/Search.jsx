import React, { Fragment, useEffect, useState } from 'react'
import '../ScssFile/Home.scss'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { url } from "../config";
function Search(props) {
  const loggedInStatus = props.loggedInStatus
  const { id } = useParams();
  const { query } = useParams();
  const numericId = parseInt(id);
  const history = useHistory();
  const [postall, setPostall] = useState([])
  const [pagecount, setPagecount] = useState()
  const [currentPage, setCurrentPage] = useState(numericId)
  const page = [...Array(pagecount).keys()].map((i) => i + 1);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [heartedPosts, setHeartedPosts] = useState([]);
  const [heartcount, setHeartcount] = useState(0)
  const [postExist, setPostExist] = useState(true)

  useEffect(() => {
    setPostall([])
    setPagecount(1)
    setCurrentPage(1)
    window.scrollTo(0, 0);
    postAllGet();
  }, [id, query])

  const postShow = (id) => {
    history.push(`/posts/${id}`)
  }
  const postAllGet = () =>{
    axios.get(`${url}/search/${query}`, { params: { page: currentPage}, withCredentials: true})
    .then(response => {
      if (response.data.status) {
        const data = response.data.post_all
        setPostall(data)
        setPagecount(response.data.total_pages)
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          bookmarkExist(data[i]);
        }
        for (let i = 0; i < data.length; i++) {
          heartExist(data[i]);
        }
        setPostExist(true)
      } else {
        setPostExist(false)
        console.log("失敗")
      }
    })
  }
  const postAdd = (page) => {
    setCurrentPage(page)
    history.push(`/search/${query}/page/${page}`)
    window.scrollTo(0, 0);
  }
  const postBack = (currentPage) => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      history.push(`/search/${query}/${currentPage - 1}`)
      }
    window.scrollTo(0, 0);
  }
  const postGo = (currentPage) => {
    if (currentPage !== pagecount) {
      setCurrentPage(currentPage + 1)
      history.push(`/search/${query}/${currentPage + 1}`)
    }
    window.scrollTo(0, 0);
  }
  const handleBookmark = (post) => {
    if  (bookmarkedPosts.includes(post.id)) {
     props.bookmarkDestroy(post)
     setBookmarkedPosts(bookmarkedPosts.filter(id => id !== post.id));
    } else {
     props.bookmarkCreate(post)
     if (loggedInStatus === "ログインなう") {
      setBookmarkedPosts([...bookmarkedPosts, post.id]);
     }
    }
   }
  const bookmarkExist = (post) => {
    setBookmarkedPosts((prevBookmarkedPosts) => {
      if (post.bookmarks && post.bookmarks[0]) {
        return [...prevBookmarkedPosts, post.id];
      } else {
        return prevBookmarkedPosts.filter(id => id !== post.id);
      }
    });
  }
  const handleHeart = (post) => {
    if  (heartedPosts.includes(post.id)) {
     props.heartDestroy(post)
     setHeartedPosts(heartedPosts.filter(id => id !== post.id));
     post.heart_count = post.heart_count - 1
    } else {
     props.heartCreate(post)
     if (loggedInStatus === "ログインなう") {
      setHeartedPosts([...heartedPosts, post.id]);
      post.heart_count = post.heart_count + 1
     }
    }
  }
  const heartExist = (post) => {
    setHeartedPosts((prevHeartedPosts) => {
      if (post.hearts && post.hearts[0]) {
        return [...prevHeartedPosts, post.id];
      } else {
        return prevHeartedPosts.filter(id => id !== post.id);
      }
    });
  }
  const handleMouseEnter = (event) => {
    event.target.play();
    event.target.controls = true;
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
    event.target.currentTime = 0;
    event.target.controls = false;
  };
  return (
    <Fragment> 
      { postExist ? 
         <></> 
           : 
         <Fragment>
           <div className='post_not_exist'>
             <h1>頑張って探したんだけど.....</h1>
             <HighlightOffIcon className='highlight_off_icon' style={{fontSize: '60px'}}/>
           </div>
         </Fragment>
      } 
      { postall[0] ? 
      <div className='post_container'>
       {postall.map((value, key) => {
         return (
         <div className='post' key={key} onClick={() => postShow(postall[key].id)}>
           <div className='head'>
             <div className='icon'>
             <img src={value.user.avatar.url}></img>
             </div>
               <Link to={`/profile/${value.user.id}/page/1`}
                  onClick={(e) => {e.stopPropagation();} }>
                     {value.user.name}
               </Link>
               <div className='bookmark' onClick={(e) => {e.stopPropagation(); handleBookmark(value); } }>
                    {bookmarkedPosts.includes(value.id) ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
               </div>
           </div>
           <div className='middle'>
              { value.file_type === "image" ? <img src={value.image.url}></img> : <></> }
              { value.file_type === "video" ? <video
                                                       onMouseEnter={handleMouseEnter}
                                                       onMouseLeave={handleMouseLeave}
                                                       volume="0.5"
                                                       src={value.image.url}>
                                                     </video> : <></>}
           </div>
           <div className='foot'>
             <a>{value.title}</a>
             <div className='favorite' onClick={(e) => {e.stopPropagation(); handleHeart(value); }}>
                  {heartedPosts.includes(value.id) ? <FavoriteIcon style={{ color: 'red' }}/> : <FavoriteBorder/>}
             </div>
             <a className='heart_count'>{value.heart_count}</a>
           </div>
         </div>
         )
       })}
      </div>
      : <></> }
      { postall.length === 0 && postExist ? 
               <div className='post_skeleton_container'>
                 {[...Array(20).keys()].map(i =>
                    <div className='post_skeleton'></div>
                 )}
               </div> :
      <div className='pagenate_container'>
       {pagecount > 1 ? 
       <div className='pagenate'><nav className='back'>back</nav>
        <button className='page_move' onClick={() => postBack(currentPage)}><NavigateBeforeIcon/></button>
        { currentPage === 1 ? "" :
         <button 
           className={1 === currentPage ? 'active' : ''}
           onClick={() => postAdd(1)}>
              1
          </button>}
        {pagecount > 6 && currentPage > pagecount - 6 ? 
        page.slice(pagecount - 6, pagecount ).map((page) => (
         <button 
          className={page === currentPage ? 'active' : ''}
          onClick={() => postAdd(page)}>
              {page}
         </button>
         )) :
        page.slice(currentPage < 7 && currentPage !== 1 ? 1 : currentPage - 1, currentPage === 1 ? currentPage + 6 : currentPage < 7 ? 7 : currentPage + 5 ).map((page) => (
         <button 
          className={page === currentPage ? 'active' : ''}
          onClick={() => postAdd(page)}>
              {page}
         </button>
         ))}
        <button className='page_move' 
           onClick={() => postGo(currentPage)}>
            <NavigateNextIcon/>
        </button>
        <nav className='next'>next</nav>
       </div> : <></> }
      </div>}
   </Fragment>
  )
} 

export default Search