import React from "react";
import WaterWave from "./WaterWave";
import style from "./style.module.css";
import CardBody from "./../card/CardBody";

function WaterRepository() {
  return (
    <div className={style.wrapper}>
      <div className={style.repository}>
        <div className={style.reminder}>
          <span className={style.reminder_percent}>55%</span>
          <span className={style.reminder_detail}>0.5 of 2l</span>
        </div>
        <WaterWave />
      </div>
    </div>
  );
}

export default WaterRepository;
