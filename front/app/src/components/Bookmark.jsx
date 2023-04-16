import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReplayIcon from '@mui/icons-material/Replay';
import PostShow from './PostShow';
function Bookmark(props) {
  const [postShowModal, setPostShowModal] = useState(false); 
  const [postShowNumber, setPostShowNumber] = useState("")
  const history = useHistory();
  const [postall, setPostall] = useState([])
  const [pagecount, setPagecount] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const page = [...Array(pagecount).keys()].map((i) => i + 1);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [heartedPosts, setHeartedPosts] = useState([]);
  const [heartcount, setHeartcount] = useState(0)
  const [postExist, setPostExist] = useState(true)

  useEffect(() => {
    setPostall([])
    window.scrollTo(0, 0);
    postAllGet();
  }, [currentPage])
  const postShow = (e) => {
    setPostShowModal(true)
    setPostShowNumber(e)
  }
  const postAllGet = () =>{
     axios.get("http://localhost:3001/bookmarks", { params: { page: currentPage }, withCredentials: true })
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
        console.log("aswsawsasaw")
      }
    })
  }
  const postAdd = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0);
  }
  const postBack = (currentPage) => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      }
    window.scrollTo(0, 0);
  }
  const postGo = (currentPage) => {
    if (currentPage !== pagecount) {
      setCurrentPage(currentPage)
    }
    window.scrollTo(0, 0);
  }
  const handleBookmark = (post) => {
   if  (bookmarkedPosts.includes(post.id)) {
    props.bookmarkDestroy(post)
    setBookmarkedPosts(bookmarkedPosts.filter(id => id !== post.id));
    console.log(bookmarkedPosts)
   } else {
    props.bookmarkCreate(post)
    setBookmarkedPosts([...bookmarkedPosts, post.id]);
   }
  }
  const bookmarkExist = (post) => {
    setBookmarkedPosts((prevBookmarkedPosts) => {
      if (post.bookmarks[0]) {
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
     console.log(heartedPosts)
    } else {
     props.heartCreate(post)
     setHeartedPosts([...heartedPosts, post.id]);
     post.heart_count = post.heart_count + 1
    }
   }
  const heartExist = (post) => {
    setHeartedPosts((prevHeartedPosts) => {
      if (post.hearts[0]) {
        return [...prevHeartedPosts, post.id];
      } else {
        return prevHeartedPosts.filter(id => id !== post.id);
      }
    });
  }
  return (
    <Fragment>
      <div className='post_container'>
       {postExist ? <></> : <h1>お気に入りの投稿を保存しよう！</h1>} 
       {postall.map((value, key) => {
         return (
         <div className='post' key={key} onClick={() => postShow(postall[key].id)}>
           <div className='head'>
             <div className='icon'>
             <img src={postall[key].user.avate ? postall[key].user.avater : 'data:image/jpeg;base64,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' }></img>
             </div>
             <a>{postall[key].user.name}</a>
               <div className='bookmark' onClick={(e) => {e.stopPropagation(); handleBookmark(postall[key]); } }>
                    {bookmarkedPosts.includes(postall[key].id) ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
               </div>
           </div>
           <div className='middle'>
              <img src={postall[key].image.url}></img>
           </div>
           <div className='foot'>
             <a>{postall[key].title}</a>
             <div className='favorite' onClick={(e) => {e.stopPropagation(); handleHeart(postall[key]); }}>
                  {heartedPosts.includes(postall[key].id) ? <FavoriteIcon style={{ color: 'red' }}/> : <FavoriteBorder/>}
             </div>
             <a className='heart_count'>{postall[key].heart_count}</a>
           </div>
         </div>
         )
       })}
      </div>
      { postall.length === 0 && postExist ? <div className='Now_Loding'>Now Loding...</div> :
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
        <button className='page_move' onClick={() => postGo(currentPage)}><NavigateNextIcon/></button><nav className='next'>next</nav>
       </div> : <></> }
      </div>}
      {postShowModal ?  <PostShow postShowModal={postShowModal} 
                                  setPostShowModal={setPostShowModal} 
                                  postShowNumber={postShowNumber} 
                                  user={props.user}
                                  bookmarkCreate={props.bookmarkCreate} bookmarkDestroy={props.bookmarkDestroy}
                                  heartCreate={props.heartCreate} heartDestroy={props.heartDestroy}
                                  bookmarkedPosts={bookmarkedPosts} setBookmarkedPosts={setBookmarkedPosts}
                                  heartedPosts={heartedPosts} setHeartedPosts={setHeartedPosts}
                                  postall={postall}
                                   />
                                   : <></>}
   </Fragment>
  )
} 

export default Bookmark