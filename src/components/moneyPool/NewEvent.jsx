/** @format */

import React, { useEffect, useState, useContext } from "react";
import { Row, Form, Col, Button, Tabs, Tab, Table } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../config";
import { getEventList } from "../../api";
import CopyLinkButton from "./partials/CopyLinkButton";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { Context } from "../../layout/Wrapper";
import Swal from "sweetalert2";
import Modal from "../modal/modal";

function NewEvent() {
  const [key, setKey] = useState("createvent");
  const [personNum, setPersonNum] = useState([2]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [busy, setBusy] = useState(false);
  const { addToast } = useToasts();
  const [notFound, setNotFound] = useState(false);
  const [selected, setSelected] = useState([]);
  const [desc, setDesc] = useState("");
  const [createing, setCreateing] = useState(false);
  const [eventList, setEventList] = useState([]);
  // Modal
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState("");
  const [pending, setPending] = useState(false);
  //
  const [eventName, setEventName] = useState("");
  const navigate = useNavigate();
  const context = useContext(Context);
  // naviget to event when click on event list row
  const handleRowClick = (id) => {
    navigate(`event/${id}`);
  };
  const handleEditNavigate = (id) => {
    navigate(`edit/${id}`);
  };
  const addPerson = () => {
    setPersonNum([...personNum, personNum.length + 2]);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const code = form.get("invite");
    if (code === "") {
      addToast(
        <FormattedMessage
          id="codeRequired"
          defaultMessage="Code is required."
        />,
        {
          appearance: "warning",
          autoDismiss: 4000,
        }
      );
      return;
    }
    setBusy(true);
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
      setBusy(false);
      navigate(`/dashboard/money-pool/event/${data?.eventId}`);
    });
  };
  function searchEmail() {
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
          setEmail("");
          setLoading(false);
          if (JSON.parse(localStorage.getItem("user"))._id != result.uid) {
            result.email = email;
            if (selected.length > 0) {
              const exist = selected.filter((user) => user.uid === result.uid);
              if (exist.length === 0) {
                setSelected([...selected, result]);
              }
            } else {
              setSelected([...selected, result]);
            }
          }
        } else {
          setNotFound(true);
        }
      });
    } else {
      setLoading(false);
    }
  }
  const handleCreatePool = async () => {
    let currency = "";
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const prefData = JSON.parse(localStorage.getItem("prefrence") || "{}");
    if (prefData) {
      currency = prefData?.currency;
    } else {
      currency = "USD";
    }
    const userName = currentUser.first_name + " " + currentUser.last_name;
    if (eventName === "") {
      addToast(
        <FormattedMessage
          id="requiredAll"
          defaultMessage="All field is required."
        />,
        {
          autoDismiss: true,
          appearance: "error",
        }
      );
      return "";
    }
    var userId = [];
    selected.length > 0 && selected.map((user) => userId.push(user.uid));
    userId = userId.join(",");
    try {
      await fetch(`${API_URL}/money-poll/new `, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          event: eventName,
          currency: currency,
          desc: desc,
          memberIds: userId,
          fullName: userName,
          icon: currentUser?.avatar?.key || "",
        }),
      }).then(async (res) => {
        if (res.status === 200) {
          const result = await res.json();
          setCreateing(false);
          addToast("Created", { autoDismiss: true, appearance: "success" });
          navigate(`/dashboard/money-pool/event/${result.eventId}`);
        } else {
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />,
            {
              autoDismiss: true,
              appearance: "Error",
            }
          );
        }
      });
    } catch (err) {
      setCreateing(false);
    }
  };
  const handleDelete = async (id) => {
    const arr = selected.filter((user) => user.uid != id);
    setSelected(arr);
  };
  async function request() {
    setLoading2(true);
    const events = await getEventList();
    if (events.data.length > 0) {
      setEventList(events.data);

      setLoading2(false);
    } else {
      setEventList([]);
      setLoading2(false);
    }
  }
  const handleDeleteEvent = (eventId) => {
    const titleMsg =
      context.getCurrent() === 0 ? "Are you sure?" : "Bist du dir sicher?";
    Swal.fire({
      title: titleMsg,
      text:
        context.getCurrent() === 0
          ? "You won't be able to revert this."
          : "Änderungen sind nicht mehr möglich.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: context.getCurrent() === 0 ? "Cancel" : "Abbrechen",
      confirmButtonText: context.getCurrent() === 0 ? "Yes" : "Fortfahren",
      reverseButtons: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/money-poll/delete?id=${eventId}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => {
            if (res.status === 200) {
              const filtred = eventList.filter((item) => item._id !== eventId);
              setEventList(filtred);
              const msg = context.getCurrent() === 0 ? "Deleted" : "gelöscht";
              Swal.fire({
                title: msg,
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.error("Error");
          });
      }
    });
  };
  //
  const handleClose = () => {
    setModalShow(false);
  };
  const handleEdit = () => {
    if (eventName === "") {
      addToast(
        <FormattedMessage
          defaultMessage="Event name is required!"
          id="event.name.req"
        />
      );
      return;
    }
    setPending(true);
    fetch(`${API_URL}/money-poll/update?id=${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        name: eventName,
        desc: desc,
      }),
    })
      .then((res) => {
        setPending(false);
        if (res.status === 200) {
          request();
          // document.getElementById(id).innerHTML=eventName
          // if(desc != ""){
          //   document.getElementById("des"+id).innerHTML=desc
          // }
          //
          addToast(
            <FormattedMessage
              defaultMessage="Event updated"
              id="event.update"
            />,
            {
              appearance: "success",
              autoDismiss: 4000,
            }
          );
          handleClose();
        }
      })
      .catch((err) => {
        setPending(false);
        addToast(
          <FormattedMessage
            defaultMessage="Server Error."
            id="app.serverError"
          />,
          {
            appearance: "warning",
            autoDismiss: 4000,
          }
        );
      });
  };
  //

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <Card className="event_card">
        <CardBody className={style.new_event}>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className={style.tab}
          >
            <Tab
              eventKey="createvent"
              title={
                <FormattedMessage
                  id="event.create"
                  defaultMessage="Create event"
                />
              }
            >
              <Row>
                <Col lg={6}>
                  <Form>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="eventName">
                        <Form.Label>
                          <FormattedMessage
                            id="event.name"
                            defaultMessage="Event name"
                          />{" "}
                        </Form.Label>
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
                    {/* <Col md={12} className={style.select_col}>
                    <Form.Group
                      className={style.select_input}
                      controlId="homeCurrency"
                    >
                      <Form.Label>
                        <FormattedMessage
                          id="event.currency"
                          defaultMessage="Home Currency"
                        />
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          setCurrency(e.target.value);
                        }}
                        aria-label="Default select example"
                      >
                        <option value="">Currency</option>
                        {currencyData &&
                          currencyData.map((currency, i) => (
                            <option
                              key={`${i}-currency`}
                              value={currency?.code}
                            >
                              {currency?.name} ({currency?.code})
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col> */}
                    {/* email */}
                    <div className={style.participant_section}>
                      <h4>
                        <FormattedMessage
                          id="event.participants"
                          defaultMessage="Participants"
                        />
                      </h4>
                      <Col md={12}>
                        {/* <AddNewMember eventName={eventName} currency={currency}/> */}
                        <div className={style.input_with_button}>
                          <Form.Group className="mb-3" controlId="person-1">
                            <Form.Label>
                              <FormattedMessage
                                id="label.email"
                                defaultMessage="Email"
                              />{" "}
                            </Form.Label>
                            <FormattedMessage
                              id="label.email"
                              defaultMessage="Email"
                            >
                              {(msg) => (
                                <Form.Control
                                  type="email"
                                  value={email}
                                  autoComplete="false"
                                  aria-haspopup="false"
                                  autoFocus="false"
                                  placeholder={msg}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                />
                              )}
                            </FormattedMessage>
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
                              <FormattedMessage
                                id="btn.add"
                                defaultMessage="Add"
                              />
                            )}
                          </Button>
                        </div>
                      </Col>
                    </div>
                    {/* not fount user */}
                    {notFound && (
                      <div style={{ color: "red" }}>
                        {" "}
                        <FormattedMessage
                          id="acc.err"
                          defaultMessage="User by this email not found."
                        />{" "}
                      </div>
                    )}
                    {/* selected user */}
                    {selected.length > 0 && (
                      <div className={style.participants}>
                        <Table striped className="mb-0">
                          <thead>
                            <tr>
                              <th>
                                <FormattedMessage
                                  id="label.name"
                                  defaultMessage="Name"
                                />
                              </th>
                              <th>
                                <FormattedMessage
                                  id="label.email"
                                  defaultMessage="Email"
                                />
                              </th>
                              <th>
                                <FormattedMessage
                                  id="label.delete"
                                  defaultMessage="Delete"
                                />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selected.map((item) => (
                              <tr>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <th>
                                  <i
                                    onClick={() => {
                                      handleDelete(item.uid);
                                    }}
                                  >
                                    <Icon icon="bx:bx-trash" />
                                  </i>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                    {/* desc */}
                    <div className={style.comment}>
                      <div className={style.form_area}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>
                            <FormattedMessage
                              id="place.descOp"
                              defaultMessage="Description(optional)"
                            />
                          </Form.Label>
                          <FormattedMessage
                            id="place.descOp"
                            defaultMessage="Description(optional)"
                          >
                            {(msg) => (
                              <Form.Control
                                as="textarea"
                                rows={2}
                                onChange={(e) => {
                                  setDesc(e.target.value);
                                }}
                                placeholder={msg}
                              />
                            )}
                          </FormattedMessage>
                        </Form.Group>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        handleCreatePool();
                      }}
                      className="mt-3"
                      type="button"
                      disabled={createing}
                    >
                      {createing ? (
                        <Icon fontSize={24} icon="eos-icons:loading" />
                      ) : (
                        <FormattedMessage
                          id="btn.createPool"
                          defaultMessage="Create Pool"
                        />
                      )}
                    </Button>
                  </Form>
                </Col>
                <Col lg={6} className={style.right_site}>
                  <div className={style.invite_form_area}>
                    <Form onSubmit={handleJoin}>
                      <Form.Group controlId="inviteCode">
                        <FormattedMessage
                          id="place.inviteCode"
                          defaultMessage="Invite code"
                        >
                          {(msg) => (
                            <Form.Control
                              type="text"
                              placeholder={msg}
                              name="invite"
                            />
                          )}
                        </FormattedMessage>
                      </Form.Group>
                      <Button type="submit">
                        {busy ? (
                          <Icon icon="eos-icons:loading" />
                        ) : (
                          <FormattedMessage
                            id="btn.join"
                            defaultMessage="Join"
                          />
                        )}
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab
              eventKey="existevent"
              title={
                <FormattedMessage id="event.list" defaultMessage="Event list" />
              }
            >
              <Table responsive hover size="sm" className={style.event_list}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <FormattedMessage
                        id="label.eventName"
                        defaultMessage="Event Name"
                      />
                    </th>

                    <th>
                      <FormattedMessage
                        id="label.crDate"
                        defaultMessage="Create date"
                      />
                    </th>
                    <th>
                      <FormattedMessage id="action" defaultMessage="Actions" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading2 ? (
                    <tr className="text-center">
                      <td colSpan={6}>
                        {
                          <Icon
                            fontSize={80}
                            icon="eos-icons:three-dots-loading"
                          />
                        }
                      </td>
                    </tr>
                  ) : eventList.length > 0 ? (
                    eventList.map((list, i) => (
                      <tr
                        style={{ verticalAlign: "middle" }}
                        key={`ev-list-${i}`}
                      >
                        <th scope="row">{++i}</th>
                        <td
                          id={list._id}
                          onClick={() => handleRowClick(list._id)}
                        >
                          {list.event}
                        </td>

                        {/* <td>{list.currency}</td> */}
                        <td>
                          {moment(list.created_at).format("MMMM DD, YYYY")}
                        </td>
                        <td>
                          <CopyLinkButton copyValue={list.uuid} />
                          <Button
                            variant="info"
                            // onClick={() => handleEditNavigate(list._id)}
                            onClick={() => {
                              setEventName(list.event);
                              setDesc(list.description);
                              setId(list._id);
                              setModalShow(true);
                            }}
                            className="mx-2"
                          >
                            <Icon icon="akar-icons:edit" />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteEvent(list._id)}
                          >
                            <Icon icon="bx:bx-trash" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <FormattedMessage
                        id="tb.noEvent"
                        defaultMessage="No event"
                      />
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
      {/* Modal */}
      <Modal
        size="md"
        show={modalShow}
        handleClose={handleClose}
        title="Edit"
        body={
          <>
            <Form>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="eventName">
                  <Form.Label>
                    <FormattedMessage
                      id="event.name"
                      defaultMessage="Event name"
                    />{" "}
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setEventName(e.target.value);
                    }}
                    value={eventName}
                    type="text"
                    placeholder="Birthday"
                    disabled={pending}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>
                    <FormattedMessage
                      id="label.desc"
                      defaultMessage="Description"
                    />{" "}
                  </Form.Label>
                  <FormattedMessage
                    id="place.descOp"
                    defaultMessage="Description(optional)"
                  >
                    {(msg) => (
                      <Form.Control
                        as="textarea"
                        rows={4}
                        cols={4}
                        value={desc || ""}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                        placeholder={msg}
                        disabled={pending}
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>
              </Col>
            </Form>
          </>
        }
        footer={
          <>
            <Button
              onClick={() => {
                handleEdit();
              }}
              type="submit"
              disabled={pending}
            >
              {pending ? (
                <Icon fontSize={24} icon="eos-icons:loading" />
              ) : (
                <FormattedMessage
                  id="event.update"
                  defaultMessage="Update Event"
                />
              )}
            </Button>
            <Button variant="outline-dark" title="" onClick={handleClose}>
              <FormattedMessage defaultMessage="Close" id="btn.close" />
            </Button>
          </>
        }
      />
    </>
  );
}

export default NewEvent;
