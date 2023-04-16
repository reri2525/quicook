import React, { Fragment, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
function PostShow(props) {
 const ref = useRef(null);
 const [post, setPost] = useState([])
 const [bookmarked, setBookmarked] = useState(false)
 const [hearted, setHearted] = useState(false)
 const CloseModal = () => {
  props.setPostShowModal(false)
 }
 useEffect(() => {
   axios.get(`http://localhost:3001/posts/${props.postShowNumber}`, { withCredentials: true })
   .then(response => {
    if (response.data.post) {
      const data = response.data.post
      console.log(data)
      setPost(data)
      setBookmarked(data.bookmarked)
      setHearted(data.hearted)
      document.body.style.overflow = 'hidden';
    }
   })
   .catch(error => {
    console.log("b")
   })
   return () => {
    document.body.style.overflow = 'auto';
   };
 }, [])
 const handleBookmark = (post) => {
   console.log("ハンドルブックマーク")
   if (bookmarked) {
      setBookmarked(false)
      props.bookmarkDestroy(post)
      props.setBookmarkedPosts(props.bookmarkedPosts.filter(id => id !== post.id));
   } else {
      setBookmarked(true)
      props.bookmarkCreate(post)
      props.setBookmarkedPosts([...props.bookmarkedPosts, post.id]);
   }
 }
 const handleHeart = (post) => {
   console.log("ハンドルハート")
   let a = props.postall.find(p => p.id === post.id)
   if (hearted) {
    setHearted(false)
    props.heartDestroy(post)
    props.setHeartedPosts(props.heartedPosts.filter(id => id !== post.id));
    post.hearts_count = post.hearts_count - 1
    a.heart_count = a.heart_count - 1
   } else {
    setHearted(true)
    props.heartCreate(post)
    props.setHeartedPosts([...props.heartedPosts, post.id]);
    post.hearts_count = post.hearts_count + 1
    a.heart_count = a.heart_count + 1
   }
 }
 if (post.image) {
  return (
   <Fragment>
    <div className='back_display'>

    </div>
    <div className='post_show_container' ref={ref}>
     <div className='head'>
       <div className='icon'>
         <img src='data:image/jpeg;base64,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'></img>
       </div>
       <Link to={`/profile/${post.user_id}`}>{post.name}</Link>
       <div className="follow">フォローする</div>
     </div>
     <div className='middle'>
        <div className='post_display'>
          <div className='post_image_display'>
            { post.image ? <img src={post.image.url} ></img> : <></> }
          </div>
          <div className='favorite_container'>
            <div className='bookmark' onClick={ () => handleBookmark(post)}>
              { bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
              <a>保存する</a>
            </div>
            <div className='heart' onClick={ () => handleHeart(post)}>
              { hearted ? <FavoriteIcon style={{ color: 'red' }}/> : <FavoriteBorder /> }
              <a>{post.hearts_count}</a>
            </div>
          </div>
        </div>
        <div className='post_detail'>
         <div className='post_detail_content'>
            <h2>{post.title}</h2>
            <a>{post.content}</a><br/>
            <p>時間:　{post.time}分</p>
            <p>費用:　{post.cost}円</p>  
            <h3>作り方:</h3>
            <a>{post.process}</a>
            <h3>ひとこと:</h3>
            <a>{post.coment}</a>
         </div>
        </div>
     </div>
     <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
    </div>
  </Fragment>
  )
 }
}

export default PostShow