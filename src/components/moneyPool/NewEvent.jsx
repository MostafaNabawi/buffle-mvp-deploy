import React, { useState } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import Card from "../card/Card";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import PersonNameField from "./partials/PersonNameField";
import { useNavigate } from "react-router-dom";
const currencyData = [
  {
    AbbreviationName: "USD",
    FullName: "US Doller",
  },
  {
    AbbreviationName: "URE",
    FullName: "Euro",
  },
  {
    AbbreviationName: "AFG",
    FullName: "Afghani",
  },
];
function NewEvent() {
  const navigate = useNavigate();
  const [personNum, setPersonNum] = useState([2]);

  const addPerson = () => {
    setPersonNum([...personNum, personNum.length + 2]);
  };

  const handleSubmit = () => {
    navigate("event");
  };

  return (
    <Card className={style.new_event_card}>
      <Row>
        <Col lg={6}>
          <Form onSubmit={handleSubmit}>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="eventName">
                <Form.Label>Event name </Form.Label>
                <Form.Control type="text" placeholder="Birth day" />
              </Form.Group>
            </Col>
            <Col md={12} className={style.select_col}>
              <Form.Group
                className={style.select_input}
                controlId="homeCurrency"
              >
                <Form.Label>Home Currency</Form.Label>
                <Form.Select aria-label="Default select example">
                  {currencyData &&
                    currencyData.map((currency) => (
                      <option
                        key={currency.FullName}
                        value={currency.AbbreviationName}
                      >
                        {currency.AbbreviationName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <div className={style.participant_section}>
              <h4>Participants</h4>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="person-1">
                  <Form.Label>You </Form.Label>
                  <Form.Control type="text" placeholder="Your name" />
                </Form.Group>
              </Col>
              {personNum.map((person) => (
                <PersonNameField key={person} num={person} />
              ))}
              <Button variant="secondary" onClick={addPerson}>
                <Icon icon="vaadin:plus" />
                Add New Person
              </Button>
            </div>
            <Button type="submit">Create Pool</Button>
          </Form>
        </Col>
        <Col lg={6} className={style.description}>
          <h4>Good examples for Creating a Maney Pool</h4>
          <p>
            Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada
            feugiat. Proin eget tortor risus. Vivamus magna justo, lacinia eget
            consectetur sed, convallis at tellus. Proin eget tortor risus.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
            vel, ullamcorper sit amet ligula. Proin eget tortor risus. Donec
            rutrum congue leo eget malesuada.
          </p>
        </Col>
      </Row>
    </Card>
  );
}

export default NewEvent;
