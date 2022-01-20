import React from "react";
import style from "./style.module.css";

function WaterRepository(props) {
  const { precent, liter, reminder } = props;
  return (
    <div className={style.wrapper}>
      <div className={style.repository}>
        {liter && (
          <div className={style.reminder}>
            <span className={style.reminder_percent}>{precent}%</span>
            <span
              className={style.reminder_detail}
            >{`${reminder} of ${liter}`}</span>
          </div>
        )}
        <div className={style.wave}></div>
      </div>
    </div>
  );
}

export default WaterRepository;
