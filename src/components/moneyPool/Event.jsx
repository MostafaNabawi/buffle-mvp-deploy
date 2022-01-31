import React, { useState } from "react";
import style from "./style.module.css";
import Card from "./../card/Card";
import CardHeader from "./../card/CardHeader";
import CardBody from "./../card/CardBody";
import PersonSelectorDropDown from "./partials/PersonSelectorDropDown";
import { Button, Form, Row } from "react-bootstrap";
import NoExpensesYet from "./partials/NoExpensesYet";
import EventPerson from "./partials/EventPerson";
import { Icon } from "@iconify/react";
import {useParams, useNavigate } from "react-router-dom";
import OverView from "./partials/OverView";
import Modal from "./../modal/modal";
import Col from "./../taskMnagement/Col";
import AddNewMember from "./partials/AddNewMember";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../config";

const eventData = [
  { name: "Hassan", icon: <Icon icon="akar-icons:check" color={`#20ca7d`} /> },
  { name: "Ali", icon: <Icon icon="bi:x-lg" color={`#4922ff`} /> },
];

function Event() {
  // event id
  const {id}=useParams()
  // add new member state
  const { addToast } = useToasts();
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState([]);
  //
  const [person, setPerson] = useState(eventData);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const AddExpenses = () => {
    navigate(`/dashboard/money-pool/event/expenses/${id}`);
  };
  const handleAddMember = async () => {    if (selected.length === 0) {
      addToast("Please add user!", { autoDismiss: true, appearance: "error" });
      return "";
    }
    try {
      setAdding(true);
      var userId = [];
      selected.length > 0 && selected.map((user) => userId.push(user.uid));
      userId = userId.join(",");

      fetch(`${API_URL}/user/find`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          memberId: userId,
          eventId: id,
        }),
      }).then(async (res) => {
        if (res.status === 200) {
          addToast("Added!", { autoDismiss: true, appearance: "success" });
          setAdding(false);
        } else {
          addToast("Error Please Try Again!", {
            autoDismiss: true,
            appearance: "success",
          });
          handleClose()
          setAdding(false);
        }
      });
    } catch {
      setAdding(false);
    }
  };

  return (
    <Card className="event_card">
      <CardHeader title="BD" />
      <CardBody className={style.card_body}>
        <div className={style.person_selector}>
          <span>You are </span>
          <PersonSelectorDropDown data={person} />
        </div>
        <div className={style.overview}>
          <div className={style.header}>
            <h4>Overview</h4>
            <Button onClick={AddExpenses}>Add expense</Button>
          </div>
          <div className={style.overview_body}>
            {/* <NoExpensesYet /> */}
            <OverView />
          </div>
        </div>
        <div className={style.seen}>
          <div className={style.header}>
            <h4>How has seen this event</h4>
            <Button onClick={handleShow}>Add new member</Button>
          </div>
          <div className={style.event_person_list}>
            {person.map((item) => (
              <EventPerson
                key={item.name}
                icon={item.icon}
                person={item.name}
              />
            ))}
          </div>
        </div>
      </CardBody>
      <Modal
        show={show}
        handleClose={handleClose}
        title="Add new member"
        body={<AddNewMember selected={selected} setSelected={setSelected} />}
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>

            <Button onClick={()=>{ handleAddMember()}} disabled={adding} variant="primary" type="submit">
              {" "}
              {adding ? (
                <Icon fontSize={24} icon="eos-icons:loading" />
              ) : (
                "Save"
              )}
            </Button>
          </>
        }
      />
    </Card>
  );
}

export default Event;
