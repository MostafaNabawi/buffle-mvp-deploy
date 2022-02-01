import React, { useState, useEffect } from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import HowMuchInputFeild from "./HowMuchInputFeild";
import ForWathInputFeild from "./ForWathInputFeild";
import WhenInputFeild from "./WhenInputFeild";
import Jumbotron from "./Jumbotron";
import {
  Form,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useDispatch } from "react-redux";

function Expense(props) {
  const { eventUsers, handleBack } = props;
  // const [userID, serUserID] = useState();
  // const dispatch = useDispatch();

  return (
    <Row>
      <Col lg={8}>
        <Form>
          <div className={`${style.person_seletor} mb-5`}>
            {/* <DropdownButton
              id="dropdown-basic-button"
              title={eventUsers[0].name}
              variant="secondary"
            >
              {eventUsers.map((item) => (
                <Dropdown.Item
                  key={item.name}
                  onClick={() => serUserID(item.name)}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </DropdownButton> */}
            <PersonSelectorDropDown />
            <span>paid for something.</span>
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
