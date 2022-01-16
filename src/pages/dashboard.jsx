import { React, useEffect, useState } from "react";
import { Row, Col, Image, Form, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import TimePicker from "react-time-picker";
import ProgressBar from "../components/common/progressBar/ProgressBar";
import TaskManagerPreogressBar from "../components/common/progressBar/TaskManagerProgress";
import CardHeader from "../components/card/CardHeader";
import Card from "../components/card/Card";
import HydrationReminderCard from "./../components/hydrationReminder/HydrationReminderCard";
import ScreenFreeReminderCard from "./../components/screenFreeReminder/ScreenFreeReminderCard";
import EventCalender from "./../components/eventCalender/EventCalender";
import ImpotentToDayCard from "./../components/impotentToDay/ImpotentToDayCard";
import BreakplanFrom from "../components/breakplan/BreakplanForm";
import Modal from "../components/modal/modal";
import { nextBreakTimeValidation, timeDifference } from "../config/utils";
import {
  addNextBreak,
  deleteNextBreak,
  getNextBreak,
  setUserFeel,
} from "../api";
import { getaAllBreackPlan } from "../api/breackPlan";
import { PulseLoader } from "react-spinners";
import { useToasts } from "react-toast-notifications";
const Dashboard = () => {
  const [timeFormat, setTimeFormat] = useState(false);
  // is show modal for...
  const [BreakPlanForm, setBreakPlanFrom] = useState(false);
  const [breakJoinOrSagest, setBreakJoinOrSagest] = useState(false);
  const [breakNewTime, setBreakNewTime] = useState(false);
  // Modal
  const [titleModal, setTitleModa] = useState("");
  const [sizeModal, setSizeModal] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
    setNextBreakDateInput("");
  };
  const handleShow = () => setModalShow(true);
  const [vacationTime, setVacationTime] = useState(false);
  const [nextBreak, setNextBreak] = useState(false);
  const [taskManager, setTaskManager] = useState(false);
  // Next Break states
  const [nextBreakTime, setNextBreakTime] = useState({
    startDate: "",
    endDate: "",
    type: 0,
  });
  const [nextBreakDateInput, setNextBreakDateInput] = useState("");
  const [nextBreakLoading, setNextBreakLoading] = useState(false);
  // Break Plan states
  const [breacPlanData, setbreakPlanData] = useState("");
  const { addToast } = useToasts();
  // actions
  const setFeel = async (type) => {
    // 1-check type
    // 2-send request
    const req = await setUserFeel(type);
    addToast("Feel Choosed", {
      appearance: "success",
    });
  };
  // next break action
  const handleNextBreakOperation = async () => {
    console.log("data", nextBreakTime);
    if (nextBreakDateInput.length === 0) {
      addToast("Time is not selected", {
        appearance: "warning",
      });
      return;
    }
    setNextBreakLoading(true);
    const start = new Date();
    const req = await addNextBreak(start, nextBreakDateInput);
    if (req.status === 200) {
      setNextBreakTime({
        startDate: start.toISOString(),
        endDate: new Date(nextBreakDateInput).toISOString(),
        type: 2,
      });
      setNextBreakDateInput("");
      setModalShow(false);
      setNextBreakLoading(false);
    } else {
      addToast("Error while adding Next Break!", {
        appearance: "error",
        autoDismiss: 5000,
      });
      setNextBreakDateInput("");
      setNextBreakLoading(false);
    }
  };
  // effects
  useEffect(() => {
    async function getBreakPlan() {
      const req = await getaAllBreackPlan();
      console.log("getaAllBreackPlan :", req);
    }
    async function innerNextBreak() {
      const result = await getNextBreak();
      // check if it has not passed
      if (result?.payload == null) {
        return;
      }
      const checkup = nextBreakTimeValidation(
        result?.payload?.start,
        result?.payload?.end
      );
      if (checkup.type === 0) {
        addToast(checkup?.msg, {
          appearance: "warning",
          autoDismiss: 4000,
        });
        // delete the next break
        await deleteNextBreak();
      }
      if (checkup.type === 1) {
        setNextBreakTime({
          startDate: result?.payload?.start,
          endDate: result?.payload?.end,
          type: 1,
        });
      }
    }
    getBreakPlan();
    innerNextBreak();
  }, []);
  return (
    <section>
      <Row>
        <Col xl={3}>
          <Card className="custom-h-card  pt-3">
            <CardHeader
              className="p-0"
              icon={<Image src="/icone/brain 1.png" alt="vector image" />}
              title="How you feel today"
            />
            <div className="pt-3 pb-0 mb-0 card-feel-icon ">
              <Image
                className="feel-icon"
                src="/icone/1.png"
                alt="vector image"
                onClick={() => setFeel("happy")}
              />
              <Image
                className="feel-icon"
                src="/icone/2.png"
                alt="vector image"
                onClick={() => setFeel("pretty")}
              />
              <Image
                className="feel-icon"
                src="/icone/3.png"
                alt="vector image"
              />
              <Image
                className="feel-icon"
                src="/icone/4.png"
                alt="vector image"
              />
              <Image
                className="feel-icon"
                src="/icone/5.png"
                alt="vector image"
              />
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card pr-5 pt-3">
            <CardHeader
              className="p-0"
              icon={
                <Image
                  src="/icone/countdown to break 2.png"
                  alt="vector image"
                />
              }
              title="Next break"
              action={
                <i
                  title="When is your next break?"
                  onClick={() => {
                    setModalShow(true);
                    setVacationTime(false);
                    setNextBreak(true);
                    setSizeModal("md");
                    setTitleModa("When is your next break?");
                  }}
                >
                  <Icon icon="vaadin:plus" />
                </i>
              }
            />
            <Col className="progress-custom mt-3">
              <ProgressBar range={nextBreakTime} />
            </Col>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card  pt-3">
            <CardHeader
              className="p-0"
              icon={
                <Image
                  src="/icone/smiling-face-with-sunglasses 1.png"
                  alt="vector image"
                />
              }
              title="Vacation Time"
              action={
                <i
                  title="Add New Vacation Time"
                  onClick={() => {
                    setModalShow(true);
                    setNextBreak(false);
                    setVacationTime(true);
                    setTaskManager(false)
                    setSizeModal("md");
                    setTitleModa("Add New Vacation Time");
                  }}
                >
                  <Icon icon="vaadin:plus" />
                </i>
              }
            />
            <div className="mt-3">
              <span className="vacation-day">23 Days </span>
              <span className="vacation-until">left until MyKonos</span>
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card pb-3 primary-gradient pt-3">
            <CardHeader
              className="p-0"
              titleClass="musicTitle"
              icon={
                <Image src="/icone/musical-note 1.png" alt="vector image" />
              }
              title="Worktunes"
            />
            {/* muted */}
            <audio controls className="mt-3">
              <source src="/music/1.mp3" type="audio/ogg" />
              <source src="/music/2.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Card>
        </Col>
      </Row>
      {/* end */}
      {/* section tow */}
      <Row>
        <Col xl={8}>
          <Card>
            <CardHeader
            titleClass="taskmanagerHeader"
              icon={
                <Image
                  className="tesk-manager-icon"
                  src="/icone/task manager 1.png"
                  alt="vector image"
                />
              }
              title="Task Manager"
              subtitle="4 opan ,1 started"
              action={
                <>
                  <i
                    title="Add New Task"
                    onClick={() => {
                      setModalShow(true);
                      setNextBreak(false);
                      setVacationTime(false);
                      setTaskManager(true);
                      setSizeModal("md");
                      setTitleModa("Add New Task");
                    }}
                  >
                    <Icon icon="vaadin:plus" />
                  </i>
                  <NavDropdown
                    className="reminderNav"
                    title={<Icon color="black" icon="vaadin:ellipsis-dots-v" />}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item className="reminderNavItem taskManagerNavItem">
                      <i
                        className="delete"
                        onClick={() => console.log("delete")}
                      >
                        <Icon icon="fluent:delete-24-filled" /> Delete
                      </i>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="reminderNavItem taskManagerNavItem">
                      <i className="edit" onClick={() => console.log("edit")}>
                        <Icon icon="ant-design:edit-filled" /> Edit
                      </i>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              }
            />
            <Row>
              <Row className="task-manager-body pt-0 mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Setting individual sales targets with the sales team
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <TaskManagerPreogressBar />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Feedback for Raj
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <TaskManagerPreogressBar type={2} />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Tracking sales goals and reporting of last week
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <TaskManagerPreogressBar type={2} />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Preparing KPIs for Timo
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <TaskManagerPreogressBar type={2} />
                </Col>
              </Row>
              <div className="devidre "></div>
            </Row>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="breakplan-card">
            <CardHeader
              icon={<Image src="/icone/direct-hit 1.png" alt="vector image" />}
              title="Breakplan"
              action=""
            />
            <div>
              <BreakplanFrom
                show={BreakPlanForm}
                setShow={setBreakPlanFrom}
                newTime={breakNewTime}
                joinOrSagest={breakJoinOrSagest}
              />
              <Row className="mt-3">
                <Col className="col-2">
                  <div className="breakplan-icon navy-blue text-center pt-2">
                    <Image
                      className="breakplan-img"
                      src="/icone/WB_Headshots-102-web 1.png"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="break-user-name">Raj Kumar</div>{" "}
                  <div>
                    <span
                      onClick={() => {
                        setBreakPlanFrom(true);
                        setBreakJoinOrSagest(true);
                        setBreakNewTime(false);
                      }}
                      className="break-type"
                    >
                      orders Lieferando
                    </span>
                    <span
                      className="break-time"
                      onClick={() => {
                        setBreakPlanFrom(true);
                        setBreakJoinOrSagest(false);
                        setBreakNewTime(true);
                      }}
                    >
                      13:00
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="col-2">
                  <div className="breakplan-icon navy-blue text-center pt-2">
                    <Image
                      className="breakplan-img"
                      src="/icone/RJ_Headshots-84-web 1.png"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="break-user-name">Raj Kumar</div>
                  <div>
                    <span className="break-type">orders Lieferando</span>
                    <span className="break-time">13:00</span>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="col-2">
                  <div className="breakplan-icon navy-blue text-center pt-2">
                    <Image
                      className="breakplan-img"
                      src="/icone/2018-11-27-Cornelius-W-111 1.png"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="break-user-name">Raj Kumar</div>
                  <div>
                    <span className="break-type">orders Lieferando</span>
                    <span className="break-time">13:00</span>
                  </div>
                </Col>
              </Row>
              {/* Create New Plan */}
              <Row className="mt-3">
                <Col>
                  <div className="creat-breack-time">
                    <div className="what-is-breack">What’s your breakplan?</div>
                    <ul className="pt-1 pl-2">
                      <li>
                        <Link
                          className="break-plan"
                          to=""
                          onClick={() => {
                            setBreakPlanFrom(true);
                            setBreakJoinOrSagest(false);
                            setBreakNewTime(false);
                          }}
                        >
                          Plan
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      {/* end */}
      <Row className="section_3">
        <Col xl={4}>
          <HydrationReminderCard />
        </Col>
        <Col xl={4}>
          <ScreenFreeReminderCard />
          <EventCalender />
        </Col>
        <Col xl={4}>
          <ImpotentToDayCard />
        </Col>
      </Row>
      {/* Modale */}
      <Modal
        size={sizeModal}
        show={modalShow}
        handleClose={handleClose}
        title={titleModal}
        body={
          <Row>
            {/* Vacation time Modal */}
            {vacationTime && (
              <>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Time </Form.Label>
                    <Form.Control type="time" />
                  </Form.Group>
                </Col>
              </>
            )}
            {/* Next Break Modal */}
            {nextBreak && (
              <>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Time </Form.Label>
                    <Form.Control
                      type="time"
                      name="data"
                      onChange={(e) => {
                        const res = timeDifference(e.target.value);
                        setNextBreakDateInput(res.date);
                      }}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            {/* Task */}
            {taskManager && (
              <>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task name </Form.Label>
                    <Form.Control type="text" name="name" />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Row>
                      <Col xl="4">
                        <Form.Label>Time Format </Form.Label>
                        <Form.Select
                          onChange={() => setTimeFormat(!timeFormat)}
                          className="selectTime"
                          aria-label="Default select example"
                        >
                          <option>Hour</option>
                          <option>Minute</option>
                        </Form.Select>
                      </Col>
                      <Col xl="8">
                        <Form.Label>Time</Form.Label>
                        <TimePicker
                          className="form-control taskManagerTime"
                          clearIcon
                          closeClock
                          format={timeFormat ? "mm:ss" : "hh:mm:ss"}
                          onChange={(value) => {
                            console.log("time...", value);
                          }}
                          // value={value}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            {/* Vacation time btn */}
            {vacationTime && (
              <Button variant="primary" type="submit">
                Create Vacation
              </Button>
            )}
            {/* Next Break Btn */}
            {nextBreak && (
              <>
                {nextBreakLoading ? (
                  <PulseLoader size={12} color="#32cd32" />
                ) : (
                  <Button
                    disabled={nextBreakDateInput.length === 0 ? true : false}
                    variant="primary"
                    type="button"
                    onClick={handleNextBreakOperation}
                  >
                    Create Next Break
                  </Button>
                )}
              </>
            )}
            {taskManager && (
              <Button
                variant="primary"
                type="button"
                // onClick={handleNextBreakOperation}
              >
                Create New Task
              </Button>
            )}
          </>
        }
      />
    </section>
  );
};

export default Dashboard;
