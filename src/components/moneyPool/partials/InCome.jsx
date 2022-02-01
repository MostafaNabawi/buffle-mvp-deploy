import React from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import HowMuchInputFeild from "./HowMuchInputFeild";
import ForWathInputFeild from "./ForWathInputFeild";
import WhenInputFeild from "./WhenInputFeild";
import { Row, Col, Form, Button } from "react-bootstrap";
import Jumbotron from "./Jumbotron";
function InCome(props) {
  const { data, handleBack } = props;
  return (
    <Row>
      <Col lg={8}>
        <Form>
          <div className={`${style.person_seletor} mb-5`}>
            <PersonSelectorDropDown data={data} />
            <span>received money for something.</span>
          </div>
          <HowMuchInputFeild />
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
