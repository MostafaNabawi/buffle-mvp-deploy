import React from "react";
import style from "./style.module.css";


function Widget(props) {
  const { icon, title, content, handleShow, id, handleClick } = props;
  return (
    <div className={style.widget} onClick={() => {
      handleShow()
      handleClick(id)
    }}>
      <div className={style.widget_header}>
        <span>{icon}</span>
        <h6>{title}</h6>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default Widget;
