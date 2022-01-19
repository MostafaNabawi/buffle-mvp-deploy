import React from "react";
import style from "./style.module.css";
function WaterWave(props) {
  const { precent } = props;
  const v1 = precent === 100 ? `0%` : `-${100 - precent}%`;
  const v2 = precent === 100 ? `0%` : `-${100 - precent + 5}%`;
  return (
    <div className={style.wave}>
      <div style={{ bottom: v1 }}></div>
      <div style={{ bottom: v2 }}></div>
    </div>
  );
}

export default WaterWave;
