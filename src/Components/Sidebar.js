import React from 'react'
import { Link } from 'react-router-dom'
import { v4 } from "uuid";

export default function Sidebar({totalData,currentWikiId,setCurrentWikiId}) {
  totalData.sort(function(a, b)  {
    return a.id - b.id;
  });
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }
  return (
    <div className='sidebar'>
    
        {totalData.map((e)=>
            <h4 key={v4()}><Link to={`/doc/${e.id}`} onClick={()=>{setCurrentWikiId(e.id);scrollToTop();}}>{e.title}</Link></h4>
        )}
    </div>
  )
}
