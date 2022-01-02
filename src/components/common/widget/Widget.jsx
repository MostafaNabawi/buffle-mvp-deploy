import React from "react";
import style from "./style.module.css";
function Widget(props) {
  const { icon, title, content } = props;
  return (
    <div className={style.widget}>
      <div className={style.widget_header}>
        <span>{icon}</span>
        <h6>{title}</h6>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default Widget;
