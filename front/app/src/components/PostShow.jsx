import React, { Fragment, useEffect, useState, useRef } from 'react';
import '../ScssFile/PostShow.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import WarnModal from './WarnModal'
function PostShow(props) {
 const ref = useRef(null);
 const currentUser = props.user
 const relationshipCreate = props.relationshipCreate
 const relationshipDestroy = props.relationshipDestroy
 const [post, setPost] = useState([])
 const [bookmarked, setBookmarked] = useState(false)
 const [hearted, setHearted] = useState(false)
 const [relationship, setRelationship] = useState(false)
 const [warnModal, setWarnModal] = useState(false)
 const [warnType, setWarnType] = useState("postDestroy")
 const { id } = useParams();
 const CloseModal = () => {
  props.setPostShowModal(false)
 }
 useEffect(() => {
  openPostShow(id)
 }, [id])

 const openPostShow = (id) => {
   axios.get(`http://localhost:3001/posts/${id}`, { withCredentials: true })
   .then(response => {
    if (response.data.post) {
      const data = response.data.post
      console.log(data)
      setPost(data)
      setBookmarked(data.bookmarked)
      setHearted(data.hearted)
      setRelationship(data.relationship)
    }
   })
   .catch(error => {
    console.log("b")
   })
   document.body.style.overflow = 'hidden';
   return () => {
    document.body.style.overflow = 'auto';
   };
 }
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
 const handleRelationship = (id) => {
   if (relationship) {
    setRelationship(false)
    relationshipDestroy(id)
   } else {
    setRelationship(true)
    relationshipCreate(id)
   }
 }
 if (post.image) {
  return (
   <Fragment>
    <div className='back_display2'>

    </div>
    <div className='post_show_container' ref={ref}>
     <div className='head'>
       <div className='icon'>
         <img src={post.user.avatar.url}></img>
       </div>
       <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
       { currentUser.id === post.user.id ?
          <></> 
           :
          relationship ?
           <div className="unfollow" onClick={() => handleRelationship(post.user.id)}>フォロー中</div>
            :
           <div className="follow" onClick={() => handleRelationship(post.user.id)}>フォローする</div>
       }
     </div>
     <div className='middle'>
        <div className='post_display'>
          <div className='post_image_display'>
            { post.file_type === "image" ? <img src={post.image.url} ></img> : <></> }
            { post.file_type === "video" ? <video autoPlay controls src={post.image.url} volume="0.1"></video> : <></>}
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
            <h3>材料:</h3>
            {[...Array(15)].map((_, i) => (
              post.materials[`material_${i + 1}`] && post.amounts[`amount_${i + 1}`] ?
               <div key={`material_${i + 1}`} className="material">
                 <a>{post.materials[`material_${i + 1}`]}</a>
                 <a className='amount_detail'>{post.amounts[`amount_${i + 1}`]}</a>
               </div>
                : 
              <></>
            ))}
            <h3>作り方:</h3>
            <a>{post.process}</a>
            <h3>ひとこと:</h3>
            <a>{post.coment}</a>
         </div>
        </div>
     </div>
     { currentUser.id === post.user.id ?
       <div className='delete' onClick={() => setWarnModal(true)}><DeleteIcon style={{ fontSize: '30px', cursor: 'pointer' }} /></div>
         : 
       <></> 
     }
     <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
    </div>
    { warnModal ? <WarnModal setWarnModal={setWarnModal} warnType={warnType} post={post} 
                             setPostShowModal={props.setPostShowModal}
                             setPostDestroy={props.setPostDestroy}
                             /> : <></> }
  </Fragment>
  )
 }
}

export default PostShow