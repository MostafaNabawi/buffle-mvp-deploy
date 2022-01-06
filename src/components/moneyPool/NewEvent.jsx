import React, { useState } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import Card from "../card/Card";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
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
  const [state, setState] = useState("");

  const filter = (input) => {
    const result = currencyData.filter(
      (item) => item.AbbreviationName === input || item.FullName === input
    );
    setState(result);
  };

  const getState = (code) => {
    if (code != "") {
      setState(code);
    } else {
      setState("");
    }
  };
  return (
    <Card className={style.new_event_card}>
      <Row>
        <Col lg={6}>
          <Form>
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
                <Form.Select
                  onInput={(e) => {
                    getState(e.target.value);
                  }}
                  aria-label="Default select example"
                >
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
                <Form.Group className="mb-3" controlId="you">
                  <Form.Label>You </Form.Label>
                  <Form.Control type="text" placeholder="Your name" />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId={`preson`}>
                  <Form.Label>Person 2 </Form.Label>
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
              </Col>
              <Button variant="secondary">
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
