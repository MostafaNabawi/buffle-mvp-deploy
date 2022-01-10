import React from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import HowMuchInputFeild from "./HowMuchInputFeild";
import ForWathInputFeild from "./ForWathInputFeild";
import WhenInputFeild from "./WhenInputFeild";
import { Button } from "react-bootstrap";
function InCome(props) {
  const { data } = props;
  return (
    <div>
      <div className={`${style.person_seletor} mb-5`}>
        <PersonSelectorDropDown data={data} />
        <span>received money for something.</span>
      </div>
      <HowMuchInputFeild />
      <ForWathInputFeild />
      <WhenInputFeild />
    </div>
  );
}

export default InCome;
