import React, { useState } from "react";
import Button from "./Button";
import style from "./style.module.css";
function Project() {
  const [show, setShow] = useState(false);
  const title = "Project";

  const handleToggle = () => {
    const showClass = !show ? style.show : "";
    setShow(showClass);
  };

  return (
    <div className={style.dropDown_wrapper}>
      <Button
        label={title || "NO roject"}
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
      />
      <div className={`${style.dropDown} ${show}`}>
        <ul>
          <li>
            <span></span>
            Project-1
          </li>
          <li>
            <span></span>
            Project-2
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Project;
