import React from "react";
import style from "./../style.module.css";
function Jumbotron(props) {
  const { title, content } = props;
  return (
    <div className={style.jumbotron}>
      <h4>{title}</h4>
      {content}
    </div>
  );
}

export default Jumbotron;
