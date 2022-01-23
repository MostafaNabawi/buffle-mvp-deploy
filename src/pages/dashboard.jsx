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
import { addNextBreak, createTask, deleteNextBreak, getNextBreak } from "../api";
import { getaAllBreackPlan } from "../api/breackPlan";
import { PulseLoader } from "react-spinners";
import { useToasts } from "react-toast-notifications";
import Felling from "../components/feel/Felling";
import { API_URL } from "../config";
const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [timeFormat, setTimeFormat] = useState(false);
  // show form for breack plan
  const [BreakPlanForm, setBreakPlanFrom] = useState(false);
  const [breakJoinOrSagest, setBreakJoinOrSagest] = useState(false);
  const [breakNewTime, setBreakNewTime] = useState(false);
  const [invateForm, setInvateForm] = useState(false);
  // Modal
  const [titleModal, setTitleModa] = useState("");
  const [sizeModal, setSizeModal] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
    setNextBreakDateInput("");
    setTaskName('');
    setDuration('');
    setError('');
    setTaskError('')
  };
  // Data for Breack plan form
  const [timeData, setTimeData] = useState([]);
  const [suggestData, setSuggestData] = useState([])
  const [joindata, setJoinData] = useState([])
  const [editData, setEditData] = useState('')
  // is show modal for...
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
  const [breacPlanData, setBreakPlanData] = useState("");
  const { addToast } = useToasts();
  // vacation Time statte
  const [vacationTimeInput, setVacationTimeInput] = useState('')
  const [vacationDataInput, setVacationDataInput] = useState('')
  const [vacationLoader, setVacationLoader] = useState(false)
  // create task
  const [duration, setDuration] = useState('');
  const [taskName, setTaskName] = useState({ name: "", });
  const [showSkleton, setShowSkleton] = useState(false);
  const [loading, setloading] = useState(false);
  const [taskError, setTaskError] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([])

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
  //
  const handleVacationTime = async () => {
    try {
      setVacationLoader(true)
      await fetch(`${API_URL}/vacation`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          time: vacationTimeInput,
          data: vacationDataInput
        }).then((res) => {
          if (res.status === 200) {
            setVacationLoader(false)
            setVacationTimeInput('')
            setVacationDataInput('')
            handleClose()
            addToast("Saved", { autoDismiss: true, appearance: "success" });
          } else {
            setVacationLoader(false)
            addToast("Error Please Try Again", { autoDismiss: true, appearance: "Error" });
          }
        })
      })
    } catch {
      setVacationLoader(false)
    }
  }
  const editBreakPlan = async (data) => {
    setEditData(data)
    setBreakPlanFrom(true);
    setBreakJoinOrSagest(false);
    setBreakNewTime(false);
    setInvateForm(false);
    return true
  }
  const joinOrNewSuggestForm = async (data, join) => {
    setSuggestData(data)
    setJoinData(join)
    setBreakPlanFrom(true);
    setBreakJoinOrSagest(true);
    setBreakNewTime(false);
    setInvateForm(false);
  }
  const timeFormBreakplan = async (data) => {
    setEditData('')
    setBreakPlanFrom(true);
    setBreakJoinOrSagest(false);
    setBreakNewTime(true);
    setInvateForm(false);
    setTimeData(data);
  }
  const validateTaskName = (value) => {
    if (!value) {
      setTaskError("Task name is required!");
      return false;
    }
    else {
      setTaskError("");
      return true;
    }
  }
  // create new task
  const handleCreateTask = async () => {
    validateTaskName(taskName.name)
    if (!duration) {
      setError("Duration time is required!");
      return false;
    }

    else {
      setError("");
      setloading(true);
      const createT = await createTask(taskName, 1, duration);
      if (createT.status === 200) {
        addToast("Created susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        setloading(false);
        setTimeFormat(false);
        setModalShow(false);
      } else {
        addToast("Error Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
        setloading(false);
        setTimeFormat(false)
        setModalShow(false);
        return true;
      }
      setloading(false);
      setDuration("");
      setTaskName('');
      setTimeFormat(false)
      setModalShow(false);
      return true;
    }
  };
  // effects
  useEffect(() => {
    async function getBreakPlan() {
      const req = await getaAllBreackPlan();
      console.log("getaAllBreackPlan :", req);
      if (req.length > 0) {
        setBreakPlanData(req);
      } else {
        setBreakPlanData([]);
      }
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
              <Felling />
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
                    setTaskManager(false);
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
              action={
                <i
                  onClick={() => {
                    setEditData('')
                    setBreakPlanFrom(true);
                    setBreakJoinOrSagest(false);
                    setBreakNewTime(false);
                    setInvateForm(true);
                  }}
                  className="invaleIcone"
                >
                  <Icon icon="flat-color-icons:invite" /> Invite
                </i>
              }
            />
            <div>
              <BreakplanFrom
                editData={editData}
                joindata={joindata}
                setEditData={setEditData}
                suggestData={suggestData}
                timeData={timeData}
                show={BreakPlanForm}
                setShow={setBreakPlanFrom}
                newTime={breakNewTime}
                joinOrSagest={breakJoinOrSagest}
                invateForm={invateForm}
              />
              {/* show Breack plan */}
              <div className="break-plan-card">
                {breacPlanData === "" ? (
                  <div className="text-center">
                    <Icon fontSize={24} icon="eos-icons:bubble-loading" />
                  </div>
                ) : breacPlanData.length === 0 ? (
                  "No Break Plan"
                ) : (
                  breacPlanData &&
                  breacPlanData.map((data) => (
                    <Row key={data._id} className="mt-3">
                      <Col className="col-2">
                        <div className="breakplan-icon navy-blue text-center pt-2">
                          <Image
                            className="breakplan-img"
                            src="/icone/WB_Headshots-102-web 1.png"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="break-user-name">
                          {data.user[0].first_name} {data.user[0].last_name}
                        </div>{" "}
                        <div>
                          <span
                            id={currentUser._id + data.name.trim()}
                            onClick={() => {
                              currentUser._id === data.user[0]._id
                                ? editBreakPlan({ id: data._id, name: data.name, time: data.time })
                                : joinOrNewSuggestForm({
                                  id: data.user[0]._id, breackName: data.name
                                },
                                  {
                                    fullName: currentUser.first_name + " " + currentUser.last_name, breakName: data.name, breakOwnerId: data.user[0]._id
                                  })
                            }}
                            className="break-type"
                          >
                            {data.name}
                          </span>
                          <span
                            className="break-time"
                            id={data._id}
                            onClick={() => {
                              currentUser._id === data.user[0]._id
                                ? editBreakPlan({ id: data._id, name: data.name, time: data.time })
                                : timeFormBreakplan({
                                  time: "",
                                  recevier: data.user[0]._id,
                                  fullName:
                                    currentUser.first_name +
                                    "" +
                                    currentUser.last_name,
                                  breakName: data.name,
                                  breakId: data._id,
                                });
                            }}
                          >
                            {data.time}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  ))
                )}
              </div>
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
                            setEditData('')
                            setBreakPlanFrom(true);
                            setBreakJoinOrSagest(false);
                            setBreakNewTime(false);
                            setInvateForm(false);
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
                    <Form.Control
                      name="data"
                      type="date"
                      onChange={(e) => { setVacationTimeInput(e.target.value) }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Time </Form.Label>
                    <Form.Control
                      time="time"
                      type="time"
                      onChange={(e) => { setVacationDataInput(e.target.value) }}
                    />
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
                    <Form.Control type="text" className={taskError.length > 0 ? "red-border-input" : "no-border-input"}
                      name="name" onChange={(e) => {
                        setTaskName({ name: e.target.value })
                      }} />
                    {taskError ? (
                      <div className="invalid-feedback d-block">{taskError}</div>
                    ) : null}
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
                          className={`form-control taskManagerTime ${error.length > 0 ? "red-border-input" : "no-border-input"
                            }`}
                          clearIcon
                          closeClock
                          format={timeFormat ? "mm:ss" : "hh:mm:ss"}
                          onChange={(value) => {
                            setDuration(value)
                          }}
                        // value={value}
                        />
                        {error ? (
                          <div className="invalid-feedback d-block">{error}</div>
                        ) : null}
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
              <Button
                disabled={vacationTimeInput === "" || vacationDataInput === "" || vacationLoader ? true : false}
                variant="primary"
                type="button"
                onClick={() => { handleVacationTime() }}
              >
                {vacationLoader ? <Icon fontSize={30} icon="eos-icons:three-dots-loading" /> : "Create Vacation"}
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
                onClick={handleCreateTask}
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