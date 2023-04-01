import React from 'react'
import WikiContents from '../Components/WikiContents';
import Sidebar from '../Components/Sidebar';
export default function Wiki({data,currentWikiId,setCurrentWikiId,titleArr,setCurrentWiki,totalData}) {
  return (
    <div className='wiki_body'>
      <Sidebar
        totalData={totalData}
        currentWikiId={currentWikiId}
        setCurrentWikiId={setCurrentWikiId}
      />
      <WikiContents 
      data={data} 
      totalData={totalData}
      currentWikiId={currentWikiId}
      setCurrentWikiId={setCurrentWikiId}
      setCurrentWiki={setCurrentWiki}
      titleArr={titleArr}
      />
    </div>
  )
}
