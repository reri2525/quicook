import React, { Fragment, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../ScssFile/WarnModal.scss'
import axios from 'axios'
function WarnModal(props) {
  const setWarnModal = props.setWarnModal
  const warnType = props.warnType
  const user = props.user
  const history = useHistory();
  const handleDestroy = () => {
    if (warnType === 'acountDestroy') {
      axios.delete(`http://localhost:3001/users/${user.id}`, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          history.go(0);
        }
      })
    }
    if (warnType === 'postDestroy') {
      axios.delete(`http://localhost:3001/posts/${user.id}`, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          history.go(0);
        }
      })
    }
  }
  return (
   <Fragment>
    <div className='back_display2'>

    </div>
    <div className='warn_modal'>
      <h3>本当に削除しますか？</h3>
      <p>この操作は取り消せません。</p>
      <button type='button' className='destroy' onClick={() => handleDestroy()}>削除</button><br/>
      <button type='button' className='cancel' onClick={() => setWarnModal(false)}>キャンセル</button>
    </div>
   </Fragment>
  )
}

export default WarnModal