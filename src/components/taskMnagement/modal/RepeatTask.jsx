import React, { useState } from "react";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
function RepeatTask() {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    const showClass = !show ? style.show : "";
    setShow(showClass);
  };

  return (
    <div className={style.dropDown_wrapper}>
      <button type="button" onClick={handleToggle} className="btn_repeat">
        <Icon icon="akar-icons:arrow-repeat" />
      </button>
      <div className={`${style.dropDown} ${show}`}>
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
