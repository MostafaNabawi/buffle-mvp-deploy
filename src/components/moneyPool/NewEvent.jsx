import React, { useEffect, useState } from "react";
import { Row, Form, Col, Button, Tabs, Tab } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import PersonNameField from "./partials/PersonNameField";
import { useNavigate } from "react-router-dom";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import AddNewMember from "./partials/AddNewMember";
import CurrencyList from "currency-list";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../config";
import Jumbotron from "./partials/Jumbotron";

function NewEvent() {
  const navigate = useNavigate();
  const [key, setKey] = useState("createvent");
  const [personNum, setPersonNum] = useState([2]);
  const [currencyData, setCurrencyData] = useState(null);
  const { addToast } = useToasts();
  const addPerson = () => {
    setPersonNum([...personNum, personNum.length + 2]);
  };

  const handleSubmit = () => {
    navigate("event");
  };
  const handleJoin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const code = form.get("invite");
    if (code === "") {
      addToast("Code is required!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    fetch(`${API_URL}/money-poll/join-event`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    }).then(async (res) => {
      const data = await res.json();
      addToast(data?.msg, {
        appearance: "info",
        autoDismiss: 3000,
      });
    });
  };
  useEffect(() => {
    setCurrencyData(Object.values(CurrencyList.getAll("en_US")));

    // console.log(CurrencyList.get("AFN"));
  }, []);
  return (
    <Card className="event_card">
      <CardBody className={style.new_event}>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          className={style.tab}
        >
          <Tab eventKey="createvent" title="Creat event">
            <Row>
              <Col lg={6}>
                <Form>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="eventName">
                      <Form.Label>Event name </Form.Label>
                      <Form.Control type="text" placeholder="Birthday" />
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
                          currencyData.map((currency, i) => (
                            <option
                              key={`${i}-currency`}
                              value={currency?.code}
                            >
                              {currency?.name} ({currency?.symbol})
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <div className={style.participant_section}>
                    <h4>Participants</h4>
                    <Col md={12}>
                      <AddNewMember />
                    </Col>
                  </div>
                  <div className={style.comment}>
                    <div className={style.form_area}>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={1}
                          placeholder="Descraption(optional)"
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <Button type="button" onClick={handleSubmit}>
                    Create Pool
                  </Button>
                </Form>
              </Col>
              <Col lg={6} className={style.right_site}>
                <Jumbotron
                  title="Good examples for Creating a Maney Pool"
                  content={
                    <p>
                      Sed porttitor lectus nibh. Nulla quis lorem ut libero
                      malesuada feugiat. Proin eget tortor risus. Vivamus magna
                      justo, lacinia eget consectetur sed, convallis at tellus.
                      Proin eget tortor risus. Vestibulum ante ipsum primis in
                      faucibus orci luctus et ultrices posuere cubilia Curae;
                      Donec velit neque, auctor sit amet aliquam vel,
                      ullamcorper sit amet ligula. Proin eget tortor risus.
                      Donec rutrum congue leo eget malesuada.
                    </p>
                  }
                />
                <div className={style.invite_form_area}>
                  <Form onSubmit={handleJoin}>
                    <Form.Group controlId="inviteCode">
                      <Form.Control
                        type="text"
                        placeholder="Invite code"
                        name="invite"
                      />
                    </Form.Group>
                    <Button type="submit">Join</Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="existevent" title="Event list">
            Event list
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default NewEvent;
