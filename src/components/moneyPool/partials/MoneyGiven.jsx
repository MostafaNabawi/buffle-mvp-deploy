import React from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import HowMuchInputFeild from "./HowMuchInputFeild";
import ForWathInputFeild from "./ForWathInputFeild";
import WhenInputFeild from "./WhenInputFeild";
import { Button, Form } from "react-bootstrap";
function MoneyGiven(props) {
  const { data } = props;
  return (
    <div>
      <div className={`${style.person_seletor} mb-5`}>
        <PersonSelectorDropDown data={data} />
        <span>gave money to someone.</span>
      </div>
      <HowMuchInputFeild />
      <div className="mb-3">
        <Form.Label> To Who?</Form.Label>
        <Form.Check type="radio" label={`Ali`} id="default radio" />
      </div>
      <ForWathInputFeild />
      <WhenInputFeild />
    </div>
  );
}

export default MoneyGiven;
