import React, { useState } from "react";
import { Link } from "react-router-dom";
import {v4} from "uuid";
export default function Pagination({ data, setCurrentWikiId,currentPage, setCurrentPage,offset, setOffset }) {
  let totalPage = Math.ceil(data.length / 5);
  const limit = 5;
  data.sort(function(a, b)  {
    return a.id - b.id;
  });
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }
  return (
    <div className="pagi">
      <div className="pagi_button_wrapper">
        <button
          className="pagi_button"
          onClick={() => {
            setCurrentPage(1);
            setOffset(0);
          }}
          disabled={currentPage < 2 ? true : false}
        >
          {"<<"}
        </button>
        <button
          className="pagi_button"
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setOffset(offset - limit);
          }}
          disabled={currentPage < 2 ? true : false}
        >
          {"<"}
        </button>
        {Array(totalPage)
          .fill()
          .map((_, i) => {
            return (
              <button
                className="pagi_button"
                key={v4()}
                onClick={() => {
                  setCurrentPage(i + 1);
                  setOffset(i*limit);
                }}
                disabled={currentPage - 1 === i ? true : false}
              >
                <div>{i + 1}</div>
              </button>
            );
          })}
        <button
          className="pagi_button"
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setOffset(offset + limit);
          }}
          disabled={currentPage > totalPage - 1 ? true : false}
        >
          {">"}
        </button>
        <button
          className="pagi_button"
          onClick={() => {
            setCurrentPage(totalPage);
            setOffset((totalPage-1)*limit);
          }}
          disabled={currentPage > totalPage-1 ? true : false}
        >
          {">>"}
        </button>
      </div>
      <div className="post_slide">
        {data &&
          data.slice(offset, offset + limit).map(({ id, title, contents }) => {
            return (
              <Link className="post_component" to={`/doc/${id}`}>
                <div
                  key={v4()}
                  onClick={() => {
                    setCurrentWikiId(id);
                    scrollToTop();
                  }}
                >
                  <h2 className="title">{title}</h2>
                  <h4 className="contents">{contents}</h4>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
