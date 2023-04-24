import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
function Postform(props) {   
  const history = useHistory();
  const [title, setTitle] = useState("")
  const titlelength = 30 - title.length
  const [imageOrVideo, setImageOrVideo] = useState("")
  const [imageOrVideoPreview, setImageOrVideoPreview] = useState("")
  const [time, setTime] = useState("")
  const [cost, setCost] = useState("")
  const [content, setContent] = useState("")
  const [materialCount, setMaterialCount] = useState(1)
  const [materialFields, setMaterialFields] = useState([
    { material: "", amount: "" }
  ]);
  const [materialError, setMaterialError] = useState('')
  const [process, setProcess] = useState("")
  const [coment, setComent] = useState("")
  const filechange = (event) => {
    const file = event.target.files[0]
    setImageOrVideo(file)
    console.log(file)
    const reader = new FileReader()
         reader.onload = (event) => {
             setImageOrVideoPreview(event.target.result)
         };
         reader.readAsDataURL(event.target.files[0])
  }
  const materialChange = (e, index) => {
    const newFields = [...materialFields];
    newFields[index].material = e.target.value;
    setMaterialFields(newFields);
  };
  const amountChange = (e, index) => {
    const newFields = [...materialFields];
    newFields[index].amount = e.target.value;
    setMaterialFields(newFields);
  };
  const materialRemove = (e) => {
   if (materialCount > 1) {
   const newMaterialFields = [...materialFields];
   newMaterialFields.pop();
   setMaterialFields(newMaterialFields);
   setMaterialCount(materialCount - 1)
   setMaterialError(null);
   }
  };
  const MaterialAdd = () => {
    if (materialCount < 15){
     setMaterialCount(materialCount + 1)
     setMaterialFields([...materialFields, { value: "" }]);
    } else {
     setMaterialError('※これ以上追加できません')
    }
  }
  const CloseModal = () => {
    props.setPostmodal(false)
    setTitle("")
    setImageOrVideo("")
    setImageOrVideoPreview("")
    setContent("")
    setCost("")
    setTime("")
    setComent("")
    setProcess("")
    setMaterialFields([
      { material: "", amount: "" }
    ])
    setMaterialCount(1)
    setMaterialError("")
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[image]', imageOrVideo);
    formData.append('post[content]', content);
    formData.append('post[time]', time);
    formData.append('post[cost]', cost);
    formData.append('post[process]', process);
    formData.append('post[coment]', coment);
    for (let i = 0; i < materialFields.length; i++) {
      formData.append(`post[material_${i + 1}]`, materialFields[i].material);
      formData.append(`post[amount_${i + 1}]`, materialFields[i].amount);
    }
    axios.post("http://localhost:3001/posts", formData
                                              ,{ withCredentials: true })
      .then(response => {
        if (response.data.status) {
          CloseModal()
          history.push("/home")
        } else if (response.data.status === 'not_created') {
          console.log("失敗")
        }
      })
      .catch((error) => {
        event.preventDefault()
        console.log("未送信")
      });
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  },[])
  return (
   <Fragment>
    <div className='back_display'>

    </div>
           <div className='postform_modal'>
            <div className='postform_modal_inner'>
             <div className='postform_modal_content'>
             <h1>レシピ投稿:</h1>
             <form className="form_post" onSubmit={onSubmit}>
                <label></label><br></br>
                <label className='video_file'>
                <CameraAltIcon />
                <input className='video'
                    type="file"
                    accept='video/*, image/*' max="240"
                    capture="environment"
                    name="video"
                    onChange={filechange}
                />
                </label><br/>
                { imageOrVideo.type === "video/mp4" || imageOrVideo.type === "video/webm" ? 
                    <video controls src={imageOrVideoPreview} className='video_display'></video>
                        :  imageOrVideoPreview ?
                        <img src={imageOrVideoPreview} className='video_display'></img>
                         :
                        <></>
                }<br />
                 <label>料理名: ※最大30文字</label>{ title && <a className={ titlelength < 0 ? 'title_length_errors' 
                                                                         : ''}>　残り{titlelength}文字</a>}<br></br>
                <input className='title'
                    type="text"
                    required
                    placeholder='料理名'
                    value={title}
                    onChange={event => setTitle(event.target.value)}  
                /><br></br>
                <label>料理概要:</label><br/>
                <textarea className='content'
                    maxLength="500"
                    type="text"
                    name="content"
                
                    placeholder='料理概要'
                    value={content}
                    onChange={event => setContent(event.target.value)}       
                /><br/>
                <button type="button" className='content_button' onClick={() => setContent("")}>取り消し</button>
                <label>時間　</label>
                <input className='input_time'
                    maxLength="1"
                    type="text"
               
                    name="time"
                    value={time}
                    onChange={event => setTime(event.target.value)}
                />　分
                <label>　　　　　費用　</label>
                <input className='input_cost'
                    maxLength="5"
                    type="text"
                 
                    name="cost"
                    value={cost} 
                    onChange={event => setCost(event.target.value)}
                />　円<br/>
                <button type='button' className='material_add' onClick={MaterialAdd}>＋　行を追加</button>
                <button type='button' className='material_remove' onClick={materialRemove}>ー　行を削除</button>
                {materialError && <a className='material_errors'>　{materialError}</a>}
                <div className='material'>
                 {materialFields.map((field, index) => {
                  return (
                   <div>
                    <label>材料:</label>
                    <input
                     className='material_input'
                     key={index}
                     type="text"
                     
                     value={field.material}
                     onChange={(e) => materialChange(e, index)}
                    />
                    <label className='amount_label'>分量:</label>
                    <input
                     className='material_input'
                     key={index}
                     
                     type="text"
                     value={field.amount}
                     onChange={(e) => amountChange(e, index)}
                    />
                   </div>
                  );
                  })}
                </div>
                 <label>作業工程:</label><br/>
                 <textarea className='process'
                    maxLength="500"
                    type="text"
                    name="process"
             
                    placeholder='作業工程'
                    value={process}
                    onChange={event => setProcess(event.target.value)}       
                 /><br/>
                  <label>ひとこと:</label><br/>
                 <textarea className='coment'
                    maxLength="200"
                    type="text"
                    name="coment"
              
                    placeholder='ひとこと'
                    value={coment}
                    onChange={event => setComent(event.target.value)}       
                 /><br/>
                <button className='post_button' type="submit">投稿する</button><br></br>
            </form>
             </div>
           </div>
           <div className='close' onClick={() => CloseModal()}><a><CloseIcon /></a></div>
         </div>
       <div className='back_display'>

       </div>
   </Fragment>
   )
}

export default Postform