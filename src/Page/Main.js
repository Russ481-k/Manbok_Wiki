import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSpinner,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

export default function Main({ data, setCurrentWiki, setCurrentWikiId }) {
  const [contents, setContents] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [post, setPost] = useState(true);
  let totalPage = Math.ceil(data.length / 5);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    setCurrentWiki([
      ...data,
      {
        id: data.length,
        title: title,
        contents: text,
      },
    ]);
    setCurrentPage(totalPage);
    setOffset((totalPage -1) * 5 +1);

    e.preventDefault();
  };

  return (
    <div className="main">
      <div className="post_up" onClick={() => setPost(!post)}>
        {post ? (
          <FontAwesomeIcon
            icon={faAngleUp}
            style={{ color: "#fff" }}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faAngleDown}
            style={{ backgroundColor: "#0ca9cc" }}
          ></FontAwesomeIcon>
        )}
      </div>
        <form onSubmit={handleSubmit} className="post">
        {post ? (
          <div>
          <h1>Global Knowledge WIKI</h1>

          <h2>Title</h2>
          <input
            className="input_title"
            type="text"
            onChange={handleTitleChange}
            placeholder="Title"
          ></input>

          <h2>Contents</h2>
          <textarea
            defaultValue=""
            onChange={handleTextChange}
            placeholder="Contents"
          ></textarea>
          <br />
          <input className="submit_button" type="submit" value="Post" />
          </div>
          ) : (
        <></>
      )}
        </form>

      <Pagination
        data={data}
        setCurrentWikiId={setCurrentWikiId}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        offset={offset}
        setOffset={setOffset}
      />

    </div>
  );
}
