import React, { useEffect, useState } from "react";
import { Row, Form, Col, Button, Tabs, Tab, Table } from "react-bootstrap";
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const [notFound, setNotFound] = useState(false);
  const [selected, setSelected] = useState([]);
  const [desc, setDesc] = useState("");
  const [createing, setCreateing] = useState(false);
  //
  const [eventName, setEventName] = useState("");
  const [currency, setCurrency] = useState("");

  const addPerson = () => {
    setPersonNum([...personNum, personNum.length + 2]);
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
  function searchEmail() {
    console.log("email", email);
    const value =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      );
    if (value) {
      setLoading(true);
      setNotFound(false);
      fetch(`${API_URL}/user/find`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: email,
          moneyPoll: true,
        }),
      }).then(async (response) => {
        const result = await response.json();
        if (result.payload) {
          setLoading(false);
          result.email = email;
          setSelected([...selected, result]);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }
  const handleCreatePool = async (uid) => {
    if (eventName === "" || currency === "") {
      return "";
    }
    try {
      setCreateing(true);
      await fetch(`${API_URL}/vacation`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          name: eventName,
          date: currency,
        }),
      }).then((res) => {
        if (res.status === 200) {
          addToast("Saved", { autoDismiss: true, appearance: "success" });
        } else {
          addToast("Error Please Try Again", {
            autoDismiss: true,
            appearance: "Error",
          });
        }
      });
    } catch (err) {}
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
                      <Form.Control
                        onChange={(e) => {
                          setEventName(e.target.value);
                        }}
                        value={eventName}
                        type="text"
                        placeholder="Birthday"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className={style.select_col}>
                    <Form.Group
                      className={style.select_input}
                      controlId="homeCurrency"
                    >
                      <Form.Label>Home Currency</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          setCurrency(e.target.value);
                        }}
                        aria-label="Default select example"
                      >
                        {currencyData &&
                          currencyData.map((currency, i) => (
                            <option
                              key={`${i}-currency`}
                              value={currency?.symbol}
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
                      {/* <AddNewMember eventName={eventName} currency={currency}/> */}
                      <div className={style.input_with_button}>
                        <Form.Group className="mb-3" controlId="person-1">
                          <Form.Label>Email </Form.Label>
                          <Form.Control
                            type="email"
                            value={email}
                            autoComplete="false"
                            aria-haspopup="false"
                            autoFocus="false"
                            placeholder="Email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </Form.Group>
                        <Button
                          type="button"
                          onClick={() => {
                            searchEmail();
                          }}
                        >
                          {loading ? (
                            <Icon fontSize={24} icon="eos-icons:loading" />
                          ) : (
                            "Add"
                          )}
                        </Button>
                      </div>
                    </Col>
                  </div>
                  {notFound && (
                    <div style={{ color: "red" }}>
                      {" "}
                      User by this email not found. code.{" "}
                    </div>
                  )}
                  {selected.length > 0 && (
                    <div className={style.participants}>
                      <Table striped className="mb-0">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.map((item) => (
                            <tr>
                              <td>{item.fullName}</td>
                              <td>{item.email}</td>
                              <th>
                                <Icon icon="bx:bx-trash" />
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  <div className={style.comment}>
                    <div className={style.form_area}>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={1}
                          onChange={(e) => {
                            setDesc(e.target.value);
                          }}
                          placeholder="Descraption(optional)"
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      handleCreatePool();
                    }}
                    className="mt-3"
                    type="button"
                  >
                    {createing ? (
                      <Icon fontSize={24} icon="eos-icons:loading" />
                    ) : (
                      "Create Pool"
                    )}
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
