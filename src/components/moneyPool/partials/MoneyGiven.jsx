import React from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import HowMuchInputFeild from "./HowMuchInputFeild";
import ForWathInputFeild from "./ForWathInputFeild";
import WhenInputFeild from "./WhenInputFeild";
import { Form, Row, Col, Button } from "react-bootstrap";
import Jumbotron from "./Jumbotron";
function MoneyGiven(props) {
  const { data, handleBack } = props;
  return (
    <Row>
      <Col lg={8}>
        <Form>
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
          <div>
            <Button className="me-2" onClick={handleBack}>
              Add
            </Button>
            <Button variant="secondary" onClick={handleBack}>
              Cancel
            </Button>
          </div>
        </Form>
      </Col>
      <Col lg={4}>
        <Jumbotron
          title="Some ideas"
          content={
            <>
              <p>Abbas withdrew money from the ATM for Hassan.</p>
              <p>Abbas paid the flat deposit for Hassan.</p>
            </>
          }
        />
      </Col>
    </Row>
  );
}

export default MoneyGiven;
