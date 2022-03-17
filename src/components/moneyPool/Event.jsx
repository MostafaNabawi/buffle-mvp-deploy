/** @format */

import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.css";
import Card from "./../card/Card";
import CardHeader from "./../card/CardHeader";
import CardBody from "./../card/CardBody";

import { Button, Col, Form, Overlay, Row, Tooltip } from "react-bootstrap";

import EventPerson from "./partials/EventPerson";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import OverView from "./partials/OverView";
import Modal from "./../modal/modal";

import AddNewMember from "./partials/AddNewMember";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { setEventUsers } from "../../store/moneyPoolSlice";
import { getOverView } from "../../api";
import CopyToClipboard from "react-copy-to-clipboard";
import { FormattedMessage } from "react-intl";

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

  // const [person, setPerson] = useState(eventData);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userEvent, setUserEvent] = useState("");
  const [eventName, setEventName] = useState("");
  const [overView, setOverView] = useState("");
  const [copyValue, setCopyValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [desc, setDesc] = useState("");
  const target = useRef(null);

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
          const { users, currency, description, owner, name, uuid } =
            await res.json();
          setDesc(description);
          setEventName(name);
          setCopyValue(uuid);
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
      addToast("Please add user.", { autoDismiss: true, appearance: "error" });
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
          icon: currentUser?.avatar?.key || "",
          fullName: currentUser.first_name + " " + currentUser.last_name,
        }),
      }).then(async (res) => {
        const payback = await res.json();
        if (res.status === 200) {
          addToast("Added.", { autoDismiss: true, appearance: "success" });
          getData();
          setAdding(false);
          handleClose();
        } else {
          addToast(`${payback?.msg || "Error While adding member"}`, {
            autoDismiss: 500,
            appearance: "error",
          });
          setAdding(false);
        }
      });
    } catch {
      setAdding(false);
    }
  };

  const hanldOverView = async (userId) => {
    console.log("user id", userId, id);
    const res = await getOverView(userId, id);
    setOverView(res);
  };

  useEffect(() => {
    getData();
    hanldOverView(userId);
  }, []);

  return (
    <Card className="event_card">
      <CardHeader title={eventName} />
      <CardBody className={style.card_body}>
        <div className="justify-content-between">
          {" "}
          <div className={style.person_selector}>
            <span>
              <FormattedMessage id="event.youAre" defaultMessage="You are" />
            </span>
            {/* <PersonSelectorDropDown /> */}
            <Form.Select
              className="selectUserVenet"
              aria-label="Default select example"
              onChange={(e) => hanldOverView(e.target.value)}
            >
              {busy
                ? ""
                : userEvent.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.first_name + " " + item.last_name}
                    </option>
                  ))}
            </Form.Select>
          </div>
          <div>
            <CopyToClipboard text={copyValue}>
              <Button
                ref={target}
                onClick={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Icon icon="akar-icons:copy" />{" "}
                <FormattedMessage
                  id="btn.inviteCode"
                  defaultMessage="Invite code"
                />
              </Button>
            </CopyToClipboard>
            <Overlay target={target.current} show={showTooltip} placement="top">
              <Tooltip id="overlay-example">
                <FormattedMessage id="event.copied" defaultMessage="Copied" />
              </Tooltip>
            </Overlay>
          </div>
        </div>

        <div className={style.overview}>
          <div className={style.header}>
            <h4>
              <FormattedMessage id="event.overview" defaultMessage="Overview" />
            </h4>
            <Button onClick={AddExpenses}>
              <FormattedMessage
                id="btn.addExpense"
                defaultMessage="Add expense"
              />
            </Button>
          </div>
          <div className={style.overview_body}>
            {/* <NoExpensesYet /> */}

            <OverView data={overView} />
          </div>
        </div>
        <Row>
          <Col lg={6}>
            <h4>Description</h4>
            <p>{desc}</p>
          </Col>
          <Col></Col>
        </Row>
        <div className={style.seen}>
          <div className={style.header}>
            <h4>
              <FormattedMessage
                id="event.howSeen"
                defaultMessage="How has seen this event"
              />
            </h4>
            <Button onClick={handleShow}>
              <FormattedMessage
                id="btn.addNewMem"
                defaultMessage="Add new member"
              />
            </Button>
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
        title={
          <FormattedMessage
            id="btn.addNewMem"
            defaultMessage="Add new member"
          />
        }
        body={<AddNewMember selected={selected} setSelected={setSelected} />}
        footer={
          <>
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
                <FormattedMessage id="btn.save" defaultMessage="Save" />
              )}
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              <FormattedMessage id="btn.close" defaultMessage="Close" />
            </Button>
          </>
        }
      />
    </Card>
  );
}

export default Event;
