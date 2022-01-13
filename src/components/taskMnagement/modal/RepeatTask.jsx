import React from "react";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
function RepeatTask(props) {
  const { handleToggle, show } = props;
  const showClass = show === "repeat_modal" ? style.show : "";
  return (
    <div className={style.dropDown_wrapper}>
      <button
        type="button"
        className="btn_repeat"
        onClick={() => handleToggle("repeat_modal")}
      >
        <Icon icon="akar-icons:arrow-repeat" />
      </button>
      <div className={`${style.dropDown}`}>
        <h6>Reapet Daily</h6>
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

export default RepeatTask;
