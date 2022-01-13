import React from "react";
import Button from "./Button";
import style from "./style.module.css";
function Project(props) {
  const { handleToggle, show } = props;
  const showClass = show === "project_modal" ? style.show : "";
  const title = "Project";

  return (
    <div className={style.dropDown_wrapper}>
      <Button
        label={title || "NO roject"}
        onClick={() => handleToggle("project_modal")}
      />
      <div className={`${style.dropDown}`}>
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
