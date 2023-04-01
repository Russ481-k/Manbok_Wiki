import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import Data from "../mocks/data";

export default function WikiContents({
  data,
  currentWikiId,
  setCurrentWikiId,
  setCurrentWiki,
  totalData,
}) {
  // const [totalData, setTotalData] = useState(Data)
  const [updateTitle, setUpdateTitle] = useState(data && data.title);
  const [updateContents, setUpdateContents] = useState(data && data.contents);
  const [update, setUpdate] = useState({
    id: currentWikiId,
    title: updateTitle,
    contents: updateContents,
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setUpdate({
      id: currentWikiId,
      title: updateTitle,
      contents: updateContents,
    });
  }, [updateTitle, updateContents]);

  const handleSubmit = () => {
    const deleteOrigin = totalData.filter((e) => e.id !== currentWikiId);
    deleteOrigin.push(update);
    setCurrentWiki([...deleteOrigin]);
    setIsUpdate(!isUpdate);
  };

  const reactStringReplace = require("react-string-replace");

  let titleArr = totalData.map((wiki) => wiki.title);
  const resultContents = () => {
    let dataContents = data && data.contents;
    for (let i = 0; i < titleArr.length; i++) {
      dataContents = reactStringReplace(
        dataContents,
        titleArr[i],
        (match, i_2) => (
          <Link
            to={`/doc/${totalData[i].id}`}
            key={v4()}
            onClick={() => {setCurrentWikiId(totalData[i].id);scrollToTop();}}
          >
            {match}
          </Link>
        )
      );
    }
    return <div>{dataContents}</div>;
  };

  const resultTitle = () => {
    let dataTitle = " ";
    for (let j = 0; j < totalData.length; j++) {
      if (
        totalData[j].contents.includes(data && data.title) &&
        !dataTitle.includes(totalData[j].title)
      ) {
        dataTitle += totalData[j].title + "\n";
      }
    }

    for (let j = 0; j < totalData.length; j++) {
      dataTitle = reactStringReplace(
        dataTitle,
        totalData[j].title,
        (match, i_3) => (
          <Link
            to={`/doc/${totalData[j].id}`}
            key={v4()}
            onClick={() => {setCurrentWikiId(totalData[j].id);scrollToTop();}}
          >
            {match}
          </Link>
        )
      );
    }
    return <div style={{height:"320px"}}>{dataTitle}</div>;
  };

  const handleClick = () => {
    setIsUpdate(!isUpdate);
  };
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }
  
  return (
    <div className="wiki_container" >
      {isUpdate ? (
        <div className="wiki_update">
        <div className="wiki_update_button" style={{ margin: "0",textAlign:"right"}}>
            <h2 style={{ color: "lightgray", margin: "0" }}>EDIT MODE</h2>
            <Link to={`/`}>
              <button onClick={()=>{handleSubmit();scrollToTop();}}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </Link>
            <button onClick={handleClick}>X</button>
          </div>

          <br />
          <h2>Title</h2>
          <input
            className="wiki_update_input_title"
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          ></input>
          <br />
          <h2>Contents</h2>
          <textarea
            className="wiki_update_input_contents"
            value={updateContents}
            onChange={(e) => setUpdateContents(e.target.value)}
          ></textarea>
          <Link
            to={`/`}
            className="submit_button"
            style={{
              width: "100%",
              color: "white",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
            onClick={()=>{handleSubmit();scrollToTop();}}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <h1
              style={{
                color: "white",
                margin: "0 0 0 20px",
                fontSize: "40px",
              }}
            >
              EDIT Complete
            </h1>
          </Link>
        </div>
      ) : (
        <div>
        <div className="wiki_update_button_out">
            <button className="wiki_update_button_blank">.</button>

            <button onClick={handleClick}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>

          </div>

        <div className="wiki_update">

          <h1>{data && data.title}</h1>
          <div>{resultContents()}</div>
          <h2>Key Words</h2>
          <div>{resultTitle()}</div>
        </div>
        </div>
      )}
      <button className="top_button" onClick={scrollToTop} style={{border:"0",borderRadius:"50px",width:"50px",height:"50px", position:"sticky",bottom:"1%",left:"100%",justifyContent:"right",color:"white"}}><h3>Top</h3></button>
    </div>
  );
}
