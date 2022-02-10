import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setDu_time,
  setDefault,
  setDis_time,
  setDefault_dis_time,
} from "../../store/screenReminderSclice";

function ScreenFreeReminderCard() {
  const { du_time, defaultTime, dis_time, default_dis_time } = useSelector(
    (state) => state.screen
  );
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
    dispatch(setDu_time(time));
    return time;
  };
  const handleDisplayTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    dispatch(setDis_time(time));
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
        dispatch(setDefault_dis_time(payload.display));
        handleDurationTime(payload.duration);
        handleDisplayTime(payload.display);
      } else {
        localStorage.setItem("screen", "off");
        dispatch(setDu_time(payload.duration));
        dispatch(setDefault_dis_time(payload.display));
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
        addToast("Added Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
      } else {
        setLoading(false);
        setModalShow(false);
        addToast("Error Please Try Again!", {
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
        addToast("Error Please Try Again!", {
          autoDismiss: true,
          appearance: "error",
        });
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
  useEffect(() => {
    getData();
    getUpdataData();
  }, []);

  return (
    <>
      <Card className={style.card}>
        <CardHeader
          icon={<Image src="/icone/eye 1.png" alt="eye icon" />}
          title="ScreenFree Reminder"
          action={
            <>
              <i
                title="Set your screen free Reminder"
                onClick={() => {
                  // getUpdataData ()
                  setModalShow(true);
                  setSizeModal("md");
                }}
              >
                <Icon icon="vaadin:plus" />
              </i>
              <i
                onClick={() => {
                  // getUpdataData ()
                  setModalShow(true);
                  setSizeModal("md");
                }}
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
            "Not set screen reminder"
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
                  <h6>{data?.display} screen free time</h6>
                </div>
                <p>
                  last intermission{" "}
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
        title="Set your screen free Reminder"
        body={
          <Row>
            <Col md={12}>
              <TimePicker2
                label={"duration time"}
                value={durationTime}
                setValue={setDurationTime}
              />
            </Col>
            <Col md={12}>
              <TimePicker2
                label={"Display Time"}
                value={displayTime}
                setValue={setDisplayTime}
              />
            </Col>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Mute " />
            </Form.Group> */}
          </Row>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={loading}
              variant="primary"
              type="button"
            >
              {loading ? <Loader color="#fff" size={13} /> : "Save"}
            </Button>
          </>
        }
      />
    </>
  );
}

export default ScreenFreeReminderCard;
