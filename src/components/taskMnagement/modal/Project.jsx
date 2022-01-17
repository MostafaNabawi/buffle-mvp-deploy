import React, { useState } from "react";
import Button from "./Button";
import style from "./style.module.css";
function Project(props) {
  const [label, setLabel] = useState("");
  const title = "Project";

  return (
    <div className={style.dropDown_wrapper}>
      <Button label={label || "NO roject"} />
      <div className={`${style.dropDown}`}>
        <ul>
          <li onChange={(e) => setLabel(e.target.children)}>
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
