import React from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import HowMuchInputFeild from "./HowMuchInputFeild";
import ForWathInputFeild from "./ForWathInputFeild";
import WhenInputFeild from "./WhenInputFeild";
import { Row, Col } from "react-bootstrap";
import Jumbotron from "./Jumbotron";
function InCome(props) {
  const { data } = props;
  return (
    <Row>
      <Col lg={8}>
        <div className={`${style.person_seletor} mb-5`}>
          <PersonSelectorDropDown data={data} />
          <span>received money for something.</span>
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
              <p>Abbas brought some bottles back to the store.</p>
              <p>The landlord returned the deposit to Abbas.</p>
            </>
          }
        />
      </Col>
    </Row>
  );
}

export default InCome;
