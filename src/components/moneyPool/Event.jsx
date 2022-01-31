import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Card from "./../card/Card";
import CardHeader from "./../card/CardHeader";
import CardBody from "./../card/CardBody";
import PersonSelectorDropDown from "./partials/PersonSelectorDropDown";
import { Button, Form, Row } from "react-bootstrap";
import NoExpensesYet from "./partials/NoExpensesYet";
import EventPerson from "./partials/EventPerson";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import OverView from "./partials/OverView";
import Modal from "./../modal/modal";
import Col from "./../taskMnagement/Col";
import AddNewMember from "./partials/AddNewMember";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../config";
import { useDispatch } from "react-redux";
import { setEventUsers } from "../../store/moneyPoolSlice";

const eventData = [
  { name: "Hassan", icon: <Icon icon="akar-icons:check" color={`#20ca7d`} /> },
  { name: "Ali", icon: <Icon icon="bi:x-lg" color={`#4922ff`} /> },
];

function Event() {
  // event id
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser._id;
  console.log("user id", userId);
  // add new member state
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState([]);
  //
  const [person, setPerson] = useState(eventData);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userEvent, setUserEvent] = useState("");
  const [currencyEvent, setCurrencyEvent] = useState("");
  const [ownerEvent, setownerEvent] = useState("");

  const getData = () => {
    try {
      setBusy(true);
      fetch(`${API_URL}/money-poll/get-members?eventId=${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const { users, currency, owner } = await res.json();
          console.log("user", users);
          var data = [];
          data.push({
            id: owner._id,
            first_name: owner.first_name,
            last_name: owner.last_name,
          });
          users &&
            users.map((user) =>
              data.push({
                id: user.personal[0]._id,
                first_name: user.personal[0].first_name,
                last_name: user.personal[0].last_name,
              })
            );
          dispatch(setEventUsers(data));
          setUserEvent(data);
          setCurrencyEvent(currency);
          setBusy(false);
        } else {
          console.log(res);
          setBusy(false);
        }
      });
    } catch (err) {
      console.log(err);
      setBusy(false);
    }
  };
  const AddExpenses = () => {
    navigate(`/dashboard/money-pool/event/expenses/${id}`);
  };
  const handleAddMember = async () => {
    if (selected.length === 0) {
      addToast("Please add user!", { autoDismiss: true, appearance: "error" });
      return "";
    }
    try {
      setAdding(true);
      var userId = [];
      selected.length > 0 && selected.map((user) => userId.push(user.uid));
      userId = userId.join(",");

      fetch(`${API_URL}/money-poll/add-member`, {
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
        console.log("re...", res);
        if (res.status === 200) {
          addToast("Added!", { autoDismiss: true, appearance: "success" });
          getData();
          setAdding(false);
          handleClose();
        } else {
          addToast("Error Please Try Again!", {
            autoDismiss: true,
            appearance: "success",
          });
          setAdding(false);
        }
      });
    } catch {
      setAdding(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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

            <Button
              onClick={() => {
                handleAddMember();
              }}
              disabled={adding}
              variant="primary"
              type="submit"
            >
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
