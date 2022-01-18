import { Icon } from "@iconify/react";
import { Image, Form, Row, Col, Button, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import { API_URL } from "../../config/index";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from "./../modal/modal";
import TimePicker2 from "../common/timePicker/TimePicker2";
import WaterRepository from "./WaterRepository";
import { getWaterHydration, createWaterHydration } from "../../api";
import { useToasts } from "react-toast-notifications";

function HydrationReminderCard() {
  const [mute, setMute] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { addToast } = useToasts();
  const [dailyGoal, setDailyGoal] = useState("");

  const [howLongTime, setHowLongTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const [reminderTime, setReminderTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const handleSubmit = async (e) => {
    const data = {
      dailyGoal,
      howLongTime,
      reminderTime,
    };
    const req = await createWaterHydration(data);
    if(req.status == 200){
      addToast("Created Susseccfully", {
        autoDismiss: true,
        appearance: "success",
      });
      handleClose();
    }

    console.log(data);
  };

  useEffect(async () => {
    const data = await getWaterHydration();
    console.log(data);
  }, []);

  return (
    <>
      <Card>
        <CardHeader
          icon={<Image src="/icone/Vector.png" alt="water drop icon" />}
          title="Hydration Reminder"
          action={
            <>
              <Icon className="pr-5" icon="vaadin:plus" onClick={handleShow} />
              {/* <Icon icon="vaadin:ellipsis-dots-v" /> */}
              <NavDropdown
                className="reminderNav"
                title={<Icon color="black" icon="vaadin:ellipsis-dots-v" />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item className="reminderNavItem">
                  Mute{" "}
                  <i
                    onClick={() => {
                      setMute(!mute);
                    }}
                  >
                    <Icon
                      fontSize={25}
                      icon={mute ? "gg:play-pause-o" : "fa-solid:stop-circle"}
                    />
                  </i>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          }
        />
        <CardBody>
          <WaterRepository />
        </CardBody>
      </Card>
      <Modal
        show={show}
        handleClose={handleClose}
        title="Hydration Reminder
        "
        body={
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>new daily goal(2L) </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="2L"
                  onChange={(e) => setDailyGoal(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <TimePicker2
                label="How long do you work"
                value={howLongTime}
                setValue={setHowLongTime}
              />
            </Col>
            <Col md={12}>
              <TimePicker2
                label="Set reminder"
                value={reminderTime}
                setValue={setReminderTime}
              />
            </Col>
          </Row>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            {/* Vacation time btn */}
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </>
        }
      />
    </>
  );
}

export default HydrationReminderCard;
