import React from "react";
import WaterWave from "./WaterWave";
import style from "./style.module.css";

function WaterRepository() {
  return (
    <div className={style.wrapper}>
      <div className={style.repository}>
        <div className={style.reminder}>
          <span className={style.reminder_percent}>55%</span>
          <span className={style.reminder_detail}>0.5 of 2l</span>
        </div>
        <WaterWave />
        {[1, 2, 3, 4, 5, 6, , 7, 8, 9, 10].map((item) => (
          <span
            key={item}
            className={`${style.water_drop} item-${item}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default WaterRepository;
