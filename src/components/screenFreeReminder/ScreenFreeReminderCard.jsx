import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image, Tabs, Tab } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import TimePicker2 from "../common/timePicker/TimePicker2";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from "../modal/modal";
import { API_URL } from "../../config/index";
import { useToasts } from "react-toast-notifications";
import Loader from "react-spinners/BeatLoader";
import style from "./style.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import {
  setDu_time,
  setDis_time,
  setUpdating,
} from "../../store/screenReminderSclice";
import { FormattedMessage } from "react-intl";

function ScreenFreeReminderCard() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [changeMute, setChangeMute] = useState(false);
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getting, setGetting] = useState(false);
  const [loadData, setLoadData] = useState(false);
  // Modal
  const [sizeModal, setSizeModal] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  // state for time input
  const [durationTime, setDurationTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [displayTime, setDisplayTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const handleDurationTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    localStorage.setItem("duration_time", time);
    dispatch(setUpdating(false));
    return time;
  };
  const handleDisplayTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    localStorage.setItem("display_time", time);
    return time;
  };
  const timeFormate = (val, getter, setter) => {
    const arr = val.split(":");
    const hover = arr[0];
    const minutes = arr[1];
    const seconds = arr[2];
    setter({
      ...getter,
      ["hours"]: hover,
      ["minutes"]: minutes,
      ["seconds"]: seconds,
    });
  };
  const getData = async () => {
    try {
      // dispatch(setDu_time("test"))
      setGetting(true);
      const req = await fetch(`${API_URL}/screen_reminder/get`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const { payload } = await req.json();
      if (payload) {
        if (payload.mute) {
          localStorage.setItem("screen", "on");
          setIsShow(true);
        } else {
          localStorage.setItem("screen", "off");
        }
        setData(payload);
        setGetting(false);
      } else {
        setData([]);
        setGetting(false);
      }
    } catch {
      setData([]);
      setGetting(false);
    }
  };
  const getUpdataData = async () => {
    try {
      const req = await fetch(`${API_URL}/screen_reminder/get`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const { payload } = await req.json();
      if (payload.mute) {
        localStorage.setItem("screen", "on");
        dispatch(setDu_time(payload.duration));
        dispatch(setDis_time(payload.display));
        handleDurationTime(payload.duration);
        handleDisplayTime(payload.display);
      } else {
        localStorage.setItem("screen", "off");
        dispatch(setDu_time(payload.duration));
        dispatch(setDis_time(payload.display));
        handleDurationTime(payload.duration);
        handleDisplayTime(payload.display);
      }
      if (payload) {
        if (payload.display != "") {
          timeFormate(payload.display, displayTime, setDisplayTime);
        }
        if (payload.duration != "") {
          timeFormate(payload.duration, durationTime, setDurationTime);
        }
      }
    } catch {
      setData([]);
      setLoadData(false);
    }
  };
  const handleSubmit = async () => {
    if (
      (durationTime.hours === "" &&
        durationTime.minutes === "" &&
        durationTime.seconds === "") ||
      (displayTime.hours === "" &&
        displayTime.minutes === "" &&
        displayTime.seconds === "")
    ) {
      return false;
    } else {
      setLoading(true);
      dispatch(setUpdating(true));
      const du_time =
        durationTime.hours +
        ":" +
        durationTime.minutes +
        ":" +
        durationTime.seconds;
      const dis_time =
        displayTime.hours +
        ":" +
        displayTime.minutes +
        ":" +
        displayTime.seconds;

      const { status } = await fetch(`${API_URL}/screen_reminder/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          duration: du_time,
          display: dis_time,
          isMute: true,
        }),
      });
      if (status === 200) {
        getUpdataData();
        setLoading(false);
        setDurationTime({ hours: "", minutes: "", seconds: "" });
        setDisplayTime({ hours: "", minutes: "", seconds: "" });
        setModalShow(false);
        getData();
        addToast(
          <FormattedMessage id="event.addedSuc" defaultMessage="Added Successfuly." />
          , {
            autoDismiss: true,
            appearance: "success",
          });
      } else {
        setLoading(false);
        setModalShow(false);
        addToast(
          <FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />, {
          autoDismiss: false,
          appearance: "error",
        });
      }
    }
  };
  const handleMute = async () => {
    setChangeMute(true);
    await fetch(`${API_URL}/screen_reminder/update-mute`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        mute: !isShow,
      }),
    }).then((res) => {
      if (res.status != 200) {
        setChangeMute(false);
        getData();
        addToast(
          <FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />,
          {
            autoDismiss: false,
            appearance: "error",
          }
        );;
        return false;
      } else {
        if (!isShow) {
          localStorage.setItem("screen", "on");
          setIsShow(true);
        } else {
          localStorage.setItem("screen", "off");
          setIsShow(false);
        }
        setChangeMute(false);
        // setIsShow(!isShow)
      }
    });
  };
  //
  const setScreeanValue = (e) => {
    if (e === "1") {
      setDurationTime({
        hours: "01",
        minutes: "00",
        seconds: "00",
      });
      setDisplayTime({
        hours: "00",
        minutes: "05",
        seconds: "00",
      });
    }
    if (e === "2") {
      setDurationTime({
        hours: "00",
        minutes: "20",
        seconds: "00",
      });
      setDisplayTime({
        hours: "00",
        minutes: "00",
        seconds: "20",
      });
    }
  };
  //
  useEffect(() => {
    getData();
    getUpdataData();
  }, []);

  return (
    <>
      <Card className={style.card}>
        <CardHeader
          icon={<Image src="/icone/eye 1.png" alt="eye icon" />}
          title={
            <FormattedMessage
              defaultMessage="Screenlife"
              id="app.screen"
            />
          }
          action={
            <>
              <i
                title="Set your screenlife"
                onClick={() => {
                  // getUpdataData ()
                  setModalShow(true);
                  setSizeModal("md");
                }}
              >
                <Icon icon="vaadin:plus" />
              </i>
              <i
              // onClick={() => {
              //   // getUpdataData ()
              //   setModalShow(true);
              //   setSizeModal("md");
              // }}
              >
                <Icon icon="vaadin:ellipsis-dots-v" />
              </i>
            </>
          }
          className="border-bottom"
        />
        <CardBody className="text-center screen-remainder">
          {getting ? (
            <Skeleton height="34px" count={1} />
          ) : data.length === 0 ? (
            <span className="no-screen">
              <FormattedMessage
                defaultMessage="Click + to add your reminder"
                id="msg.noScreenR"
              />
            </span>
          ) : (
            data && (
              <div className={style.wrapper}>
                <div className={style.header}>
                  <span>
                    {changeMute ? (
                      <Icon fontSize={24} icon="eos-icons:loading" />
                    ) : (
                      <Form.Check
                        onClick={() => {
                          handleMute();
                        }}
                        defaultChecked={isShow}
                        type="checkbox"
                      />
                    )}
                  </span>
                  <h6>
                    {data?.display}{" "}
                    <FormattedMessage
                      defaultMessage="Screenlife"
                      id="app.screen"
                    />
                  </h6>
                </div>
                <p>
                  <FormattedMessage
                    defaultMessage=" last intermission"
                    id="screen.lastIntermission"
                  />
                  {" "}
                  {localStorage.getItem("loackTime")
                    ? localStorage.getItem("loackTime")
                    : "00:00:00"}
                </p>
              </div>
            )
          )}
        </CardBody>
      </Card>
      {/* Modal */}
      <Modal
        size={sizeModal}
        show={modalShow}
        handleClose={handleClose}
        title={
          <FormattedMessage
            id="app.screen"
            defaultMessage="Set your screenlife"
          />
        }
        body={
          <Tabs
            defaultActiveKey="default"
            transition={true}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="default"
              title={
                <FormattedMessage id="app.default" defaultMessage="Default" />
              }
              className="pt-3 pb-4"
            >
              <Form.Label>
                <FormattedMessage defaultMessage="Options" id="app.options" />
              </Form.Label>
              <Form.Check
                onChange={(e) => {
                  setScreeanValue(e.target.value);
                }}
                value="1"
                name="screen"
                type="radio"
                label={
                  <FormattedMessage
                    id="label.5min"
                    defaultMessage="5 minutes after every hour"
                  />
                }
              />
              <Form.Check
                onChange={(e) => {
                  setScreeanValue(e.target.value);
                }}
                value="2"
                name="screen"
                type="radio"
                label={
                  <FormattedMessage
                    id="label.20min"
                    defaultMessage="20 seconds after 20 minutes
"
                  />
                }
              />
            </Tab>
            <Tab
              eventKey="custome"
              title={
                <FormattedMessage defaultMessage="Custom" id="app.custome" />
              }
            >
              <Row>
                <Col md={12}>
                  <TimePicker2
                    label={
                      <FormattedMessage
                        defaultMessage="duration time"
                        id="label.duTime"
                      />
                    }
                    value={durationTime}
                    setValue={setDurationTime}
                  />
                </Col>
                <Col md={12}>
                  <TimePicker2
                    label={
                      <FormattedMessage
                        defaultMessage="Display Time"
                        id="label.disTime"
                      />
                    }
                    value={displayTime}
                    setValue={setDisplayTime}
                  />
                </Col>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Mute " />
            </Form.Group> */}
              </Row>
            </Tab>
          </Tabs>
        }
        footer={
          <>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={loading}
              variant="primary"
              type="button"
            >
              {loading ? (
                <Loader color="#fff" size={13} />
              ) : (
                <FormattedMessage defaultMessage="Save" id="btn.save" />
              )}
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              <FormattedMessage defaultMessage="Close" id="btn.close" />
            </Button>
          </>
        }
      />
    </>
  );
}

export default ScreenFreeReminderCard;
