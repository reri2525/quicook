import { Fragment, useState } from 'react';
import ListDialog from './ListDialog';
import '../ScssFile/List.scss'
import useMedia from 'use-media';
function List() {
 const isWide = useMedia({minWidth: '1000px'});
 const [dialog, setDialog] = useState(false)
 return (
 <Fragment>
    { isWide ? 
      <ListDialog /> 
    :
    dialog ?
    <>
    <div className='back_display'></div>
     <ListDialog />
    </>
    : 
    <>
      <div className='dialog'>
         <button className='dialog_button' onClick={() => setDialog(true)}>=</button>
      </div>
    </>
    }
  </Fragment> 
 );
}
export default List;