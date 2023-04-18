import Header from './Header'
import React, { Fragment, useState, useEffect } from 'react';
import List from './List'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
function Postform(props) {   
  const history = useHistory();
  const [title, setTitle] = useState("")
  const titlelength = 30 - title.length
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [time, setTime] = useState("")
  const [cost, setCost] = useState("")
  const [content, setContent] = useState("")
  const [materialcount, setMaterialcount] = useState(1)
  const [materialfields, setMaterialfields] = useState([
    { material: "", amount: "" }
  ]);
  const [materialerror, setMaterialerror] = useState('')
  const [process, setProcess] = useState("")
  const [coment, setComent] = useState("")
  const filechange = (event) => {
    setImage(event.target.files[0])
    const reader = new FileReader()
         reader.onload = (event) => {
             setImagePreview(event.target.result)
         };
         reader.readAsDataURL(event.target.files[0])
  }
  const Contentreset = () => {
    setContent("");
  }
  const materialChange = (e, index) => {
    const newFields = [...materialfields];
    newFields[index].material = e.target.value;
    setMaterialfields(newFields);
  };
  const amountChange = (e, index) => {
    const newFields = [...materialfields];
    newFields[index].amount = e.target.value;
    setMaterialfields(newFields);
  };
  const materialreset = (e) => {
   if (materialcount > 1) {
   let a = materialfields.splice(1);
   setMaterialfields(a);
   setMaterialcount(materialcount - 1)
   setMaterialerror(null);
   }
  };
  const MaterialInputCount = () => {
    if (materialcount < 15){
     setMaterialcount(materialcount + 1)
     setMaterialfields([...materialfields, { value: "" }]);
    } else {
     setMaterialerror('※これ以上追加できません')
    }
  }
  const CloseModal = () => {
    props.setPostmodal(false)
    setTitle("")
    setImage("")
    setImagePreview("")
    setContent("")
    setCost("")
    setTime("")
    setComent("")
    setProcess("")
    setMaterialfields([
      { material: "", amount: "" }
    ])
    setMaterialcount(1)
    setMaterialerror("")
  }
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[image]', image);
    formData.append('post[content]', content);
    formData.append('post[time]', time);
    formData.append('post[cost]', cost);
    formData.append('post[process]', process);
    formData.append('post[coment]', coment);
    for (let i = 0; i < materialfields.length; i++) {
      formData.append(`post[material_${i + 1}]`, materialfields[i].material);
      formData.append(`post[amount_${i + 1}]`, materialfields[i].amount);
    }
    axios.post("http://localhost:3001/posts", formData
                                              ,{ withCredentials: true })
      .then(response => {
        if (response.data.status) {
          CloseModal()
          history.push('/')
        } else if (response.data.status === 'not_created') {
          console.log("失敗")
        }
      })
      .catch((error) => {
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
                <label>画像:</label><br></br>
                <label className='video_file'>
                <CameraAltIcon />
                <input className='video'
                    type="file"
                    accept='image/*'
                    capture="environment"
                    name="video"
                    onChange={filechange}
                />
                </label><br/>
                { imagePreview && <img src={imagePreview} className='video_display'></img> }<br />
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
                <button type="button" className='content_button' onClick={Contentreset}>取り消し</button>
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
                <button type='button' className='material_add' onClick={MaterialInputCount}>＋　行を追加</button>
                <button type='button' className='material_remove' onClick={materialreset}>ー　行を削除</button>
                {materialerror && <a className='material_errors'>　{materialerror}</a>}
                <div className='material'>
                 
                 {materialfields.map((field, index) => {
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