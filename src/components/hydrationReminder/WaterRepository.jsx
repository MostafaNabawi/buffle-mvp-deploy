import React from "react";
import style from "./style.module.css";

function WaterRepository(props) {
  const { precent, liter, reminder } = props;
  return (
    <div className={style.wrapper}>
      <div className={style.repository}>
        {liter > 0 && (
          <>
            <div className={style.reminder}>
              <span className={style.reminder_percent}>{precent}%</span>
              <span className={style.reminder_detail}>
                {` ${reminder} of ${liter} `}
              </span>
            </div>

            <div className={style.wave}></div>
            <div className={style.water_drops}>
              {[1, 2, 3, 4, 5, 6, , 7, 8, 9, 10, 11, 12].map((item) => (
                <span key={item}></span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WaterRepository;
