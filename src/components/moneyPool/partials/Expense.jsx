import React from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import HowMuchInputFeild from "./HowMuchInputFeild";
import ForWathInputFeild from "./ForWathInputFeild";
import WhenInputFeild from "./WhenInputFeild";
import Jumbotron from "./Jumbotron";
import { Row, Col } from "react-bootstrap";
function Expense(props) {
  const { data } = props;
  return (
    <Row>
      <Col lg={8}>
        <div className={`${style.person_seletor} mb-5`}>
          <PersonSelectorDropDown data={data} />
          <span>paid for something.</span>
        </div>
        <HowMuchInputFeild />
        <ForWathInputFeild />
        <WhenInputFeild />
      </Col>
      <Col lg={4}>
        <Jumbotron
          title="Some ideas"
          content={
            <>
              <p>Abbas paid for the rental car.</p>
              <p>Abbas got some supplies from the supermarket.</p>
            </>
          }
        />
      </Col>
    </Row>
  );
}

export default Expense;
