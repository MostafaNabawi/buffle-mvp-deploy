import React from "react";
import WaterWave from "./WaterWave";
import style from "./style.module.css";

function WaterRepository() {
  return (
    <div className={style.wrapper}>
      <div className={style.repository}>
        <WaterWave />
      </div>
    </div>
  );
}

export default WaterRepository;
