import React from "react";
import style from "./style.module.css";
function Button(props) {
  const { label } = props;
  return (
    <button className={style.button} {...props} type="button">
      <span></span>
      {label}
    </button>
  );
}

export default Button;
