import React, { Fragment, useState } from 'react';
import '/usr/src/app/app/src/App.scss';
import { Link } from "react-router-dom";
import Header from './Header';
import { ListData1 } from './ListData';
import { ListData2 } from './ListData';
import { CategoryData } from './ListData';
import { DishData } from './ListData';
import { ListData3 } from './ListData';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
function Set(props) {
 const [categoryExpand, setCategoryExpand] = useState(false)
 const [dishExpand, setDishExpand] = useState([])
 return (
 <Fragment>
    <div className="list_area">
      <div className='list_inner'>
      <ul>
       {ListData1.map((value, key) => {
        return (
         <Link to={value.link} className="list_link">
         <li key={key} className = {window.location.pathname === value.link ? "list_active" : "list"}>
            <a className='icon'> 
               {window.location.pathname === value.link  && value.icon2? value.icon2 : value.icon}
            </a>
            <a className='list_title'>
               {value.title}
            </a>
         </li>
         </Link>
        )
       })}
      </ul>
      <ul>
         <li  className="list2">
            <a className='icon'> 
               {ListData2[0].icon}
            </a>
            <a className='list_title'>
               {ListData2[0].title}
            </a><br/>
            <a className='category_expand' onClick={() => 
                                           categoryExpand ?  setCategoryExpand(false) : setCategoryExpand(true)}
             >{ categoryExpand ? ListData2[1].icon2 : ListData2[1].icon }
            </a>
         </li>
         { categoryExpand ? 
          CategoryData.map((value, key) => {
          return (
           <li className='category'>
            <img src={value.icon}></img>
            <a>{value.title}</a>
            { dishExpand[key] ?
             <Fragment>
              <ExpandLess
               style={{ position: 'relative', top: '7px', left: '6px', cursor: 'pointer' }} 
               onClick={() =>
               setDishExpand(prevState => ({ ...prevState, [key]: false }))} 
              />
               <ul>
                { DishData[key].dish1 ? <li className='dish'>{DishData[key].dish1}</li> : <></> }
                { DishData[key].dish2 ? <li className='dish'>{DishData[key].dish2}</li> : <></> }
                { DishData[key].dish3 ? <li className='dish'>{DishData[key].dish3}</li> : <></> }
                { DishData[key].dish4 ? <li className='dish'>{DishData[key].dish4}</li> : <></> }
                { DishData[key].dish5 ? <li className='dish'>{DishData[key].dish5}</li> : <></> }
               </ul> 
             </Fragment> :
              <ExpandMore 
               style={{ position: 'relative', top: '7px', left: '6px', cursor: 'pointer' }} 
               onClick={() =>
               setDishExpand(prevState => ({ ...prevState, [key]: true }))} 
              /> }
              {console.log()}
           </li>
           )
          })
          : <></> }
      </ul>
      <ul>
       {ListData3.map((value, key) => {
        return (
         <Link to={value.link} className="list_link">
         <li key={key} className = {window.location.pathname === value.link ? "list_active" : "list"}>
            <a className='icon'> 
               {window.location.pathname === value.link  && value.icon2? value.icon2 : value.icon}
            </a>
            <a className='title_list'>
               {value.title}
            </a>
         </li>
         </Link>
        )
       })}
      </ul>
      </div>
    </div>
  </Fragment> 
 );
}
export default Set;