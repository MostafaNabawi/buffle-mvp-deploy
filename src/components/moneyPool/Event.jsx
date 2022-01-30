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
import { useNavigate } from "react-router-dom";
import OverView from "./partials/OverView";
import Modal from "./../modal/modal";
import Col from "./../taskMnagement/Col";
import AddNewMember from "./partials/AddNewMember";

const eventData = [
  { name: "Hassan", icon: <Icon icon="akar-icons:check" color={`#20ca7d`} /> },
  { name: "Ali", icon: <Icon icon="bi:x-lg" color={`#4922ff`} /> },
];

function Event() {
  const [person, setPerson] = useState(eventData);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const AddExpenses = () => {
    navigate("expenses");
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
        body={<AddNewMember />}
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>

            <Button variant="primary" type="submit">
              {" "}
              Save
            </Button>
          </>
        }
      />
    </Card>
  );
}

export default Event;
