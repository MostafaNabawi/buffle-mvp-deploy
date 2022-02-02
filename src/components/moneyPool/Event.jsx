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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { setEventUsers } from "../../store/moneyPoolSlice";

function Event() {
  // event id
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser._id;
  // add new member state
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState([]);
  //
  // const [person, setPerson] = useState(eventData);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userEvent, setUserEvent] = useState("");
  const [currencyEvent, setCurrencyEvent] = useState("");
  const [eventName, setEventName] = useState("");
  const [uCode, setUCode] = useState("");

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
          const { users, currency, owner, name, uuid } = await res.json();
          setEventName(name);
          setUCode(uuid);
          var data = [];
          data.push({
            id: owner._id,
            first_name: owner.first_name,
            last_name: owner.last_name,
            seen: true,
          });
          users &&
            users.map((user) =>
              data.push({
                id: user.personal[0]._id,
                first_name: user.personal[0].first_name,
                last_name: user.personal[0].last_name,
                seen: user.seen,
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
  const getExpendes = () => {
    try {
      loading(true);
      fetch(`${API_URL}/money-poll/get-members?eventId=${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          console.log("exp....", data);
          setLoading(false);
        } else {
          console.log(res);
          setLoading(false);
        }
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
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
      <CardHeader title={eventName} />
      <CardBody className={style.card_body}>
        <div className={style.person_selector}>
          <span>You are </span>
          {/* <PersonSelectorDropDown /> */}
          <Form.Select
            className="selectUserVenet"
            aria-label="Default select example"
          >
            {busy
              ? ""
              : userEvent.map((item) => (
                  <option key={item.id}>
                    {item.first_name + " " + item.last_name}
                  </option>
                ))}
          </Form.Select>
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
            {busy ? (
              <Skeleton count={3} />
            ) : (
              userEvent &&
              userEvent.map((item) => (
                <EventPerson
                  key={item.id}
                  icon={
                    item.seen ? (
                      <Icon icon="akar-icons:check" color={`#20ca7d`} />
                    ) : (
                      <Icon icon="bi:x-lg" color={`#4922ff`} />
                    )
                  }
                  person={item.first_name + " " + item.last_name}
                />
              ))
            )}
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
