/** @format */

import React from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";

function WaterRepository(props) {
  const { liter, animat } = props;
  const { precent, reminder } = useSelector((state) => state.hydration);
  const animatClass = animat ? style.animat : "";
  return (
    <div className={style.wrapper}>
      <div className={style.repository}>
        {liter > 0 && (
          <>
            <div className={style.reminder}>
              <span className={style.reminder_percent}>{precent}%</span>
              <span className={style.reminder_detail}>
                {` ${
                  reminder === liter ? liter : Number(reminder).toFixed(2)
                } of ${liter} `}
              </span>
            </div>

            <div className={`${style.wave} ${animatClass} `}></div>
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
