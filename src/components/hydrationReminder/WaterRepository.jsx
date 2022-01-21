import React from "react";
import WaterWave from "./WaterWave";
import style from "./style.module.css";

function WaterRepository(props) {
  const { data } = props;
  return (
    <div className={style.wrapper}>
      <div className={style.repository}>
        <div className={style.reminder}>
          <span className={style.reminder_percent}>{data}%</span>
          <span className={style.reminder_detail}>0.5 of 2l</span>
        </div>
        <WaterWave verticale={0} />
        <div className={style.water_drops}>
          {[1, 2, 3, 4, 5, 6, , 7, 8, 9, 10].map((item) => (
            <span key={item}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WaterRepository;
