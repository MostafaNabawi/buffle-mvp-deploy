import { useEffect, useState, Fragment, useMemo } from "react";
import { Row, Col, Image, Form, Button, NavDropdown } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TimePicker from "react-time-picker";
import ProgressBar from "../components/common/progressBar/ProgressBar";
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
  createTask,
  deleteNextBreak,
  getNextBreak,
  getDashboardTask,
  updateDhashboardTask,
  getTaskById,
  deleteMultiTask,
} from "../api";
import { getaAllBreackPlan } from "../api/breackPlan";
import { PulseLoader } from "react-spinners";
import { useToasts } from "react-toast-notifications";
import Felling from "../components/feel/Felling";
import BeatLoader from "react-spinners/BeatLoader";
import { API_URL } from "../config";
import Countdown from "react-countdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Timer from "./../components/common/progressBar/TaskProgress";
import Player from "../components/spotify/Player";
import moment, { now } from "moment";
import SpotifyLogin from "../components/spotify/Login";

const Dashboard = () => {
  const [code, setCode] = useState(
    new URLSearchParams(window.location.search).get("code")
  );
  const [showPlayer, setShowPlayer] = useState(false);
  const MySwal = withReactContent(Swal);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [timeFormat, setTimeFormat] = useState(false);
  const [updateTimeFormat, setUpdateTimeFormat] = useState("");
  // show form for breack plan
  const [BreakPlanForm, setBreakPlanFrom] = useState(false);
  const [breakJoinOrSagest, setBreakJoinOrSagest] = useState(false);
  const [breakNewTime, setBreakNewTime] = useState(false);
  const [invateForm, setInvateForm] = useState(false);
  // Modal
  const [titleModal, setTitleModa] = useState("");
  const [sizeModal, setSizeModal] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const handleClose = () => {
    setModalShow(false);
    setNextBreakDateInput("");
    setTaskName("");
    setDuration("");
    setError("");
    setTaskError("");
  };
  // Data for Breack plan form
  const [timeData, setTimeData] = useState([]);
  const [suggestData, setSuggestData] = useState([]);
  const [joindata, setJoinData] = useState([]);
  const [editData, setEditData] = useState("");
  // is show modal for...
  const handleShow = () => setModalShow(true);
  const [vacationTime, setVacationTime] = useState(false);
  const [nextBreak, setNextBreak] = useState(false);
  const [taskManager, setTaskManager] = useState(false);
  const [taskManagerUpdate, setTaskManagerUpdate] = useState(false);
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
  const [vacationNameInput, setVacationNameInput] = useState("");
  const [vacationDataInput, setVacationDataInput] = useState("");
  const [vacationData, setVacationData] = useState("");
  const [vacationLoader, setVacationLoader] = useState(false);
  // create task
  const [duration, setDuration] = useState("");
  const [updateDuration, setUpdateDuration] = useState("");
  const [taskName, setTaskName] = useState({ name: "" });
  const [updateTaskName, setUpdateTaskName] = useState({ name: "" });
  const [showSkleton, setShowSkleton] = useState(false);
  const [loading, setloading] = useState(false);
  const [taskError, setTaskError] = useState("");
  const [taskUpdateError, setTaskUpdatekError] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const [error, setError] = useState("");
  const [taskData, setTaskData] = useState([]);
  const [taskReload, setTaskReload] = useState(false);
  const [checkId, setCheckedId] = useState([]);
  const [oldTaskName, setOldTaskName] = useState({ name: "" });
  const [oldTaskTime, setOldTaskTime] = useState("");
  const [start, setStart] = useState(0);
  const [opan, setOpan] = useState(0);
  const [complete, setComplete] = useState("");
  const [move, setMove] = useState("");
  const RenderPlayerOrLogin = useMemo(() => {
    if (showPlayer) {
      const codeToken = localStorage.getItem("spotToken");
      return <Player code={codeToken} />;
    }
    return <SpotifyLogin />;
  }, [showPlayer]);

  // next break action
  const handleNextBreakOperation = async () => {
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
  const creatVacationTime = async () => {
    try {
      setVacationLoader(true);
      await fetch(`${API_URL}/vacation`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          name: vacationNameInput,
          date: vacationDataInput,
        }),
      }).then((res) => {
        if (res.status === 200) {
          getVacationTime();
          setVacationLoader(false);
          setVacationNameInput("");
          setVacationDataInput("");
          handleClose();
          addToast("Saved", { autoDismiss: true, appearance: "success" });
        } else {
          setVacationLoader(false);
          addToast("Error Please Try Again", {
            autoDismiss: true,
            appearance: "Error",
          });
        }
      });
    } catch (err) {
      setVacationLoader(false);
    }
  };

  const getVacationTime = async () => {
    try {
      await fetch(`${API_URL}/vacation`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const { payload } = await res.json();
          if (payload && payload.date) {
            setVacationData(payload);
            setVacationDataInput(payload.date);
            setVacationNameInput(payload.name);
          } else {
            setVacationData("noVacation");
          }
        }
      });
    } catch (err) {
      console.log("Server Error");
    }
  };
  const editBreakPlan = async (data) => {
    setEditData(data);
    setBreakPlanFrom(true);
    setBreakJoinOrSagest(false);
    setBreakNewTime(false);
    setInvateForm(false);
    return true;
  };
  const joinOrNewSuggestForm = async (data, join) => {
    setSuggestData(data);
    setJoinData(join);
    setBreakPlanFrom(true);
    setBreakJoinOrSagest(true);
    setBreakNewTime(false);
    setInvateForm(false);
  };
  const timeFormBreakplan = async (data) => {
    setEditData("");
    setBreakPlanFrom(true);
    setBreakJoinOrSagest(false);
    setBreakNewTime(true);
    setInvateForm(false);
    setTimeData(data);
  };
  const validateTaskName = (value) => {
    if (!value) {
      setTaskError("Task name is required!");
      return false;
    } else {
      setTaskError("");
      return true;
    }
  };
  const validateTaskTime = (value) => {
    if (!value) {
      setError("Task duration is required!");
      return false;
    } else {
      setError("");
      return true;
    }
  };
  // create new task
  const handleCreateTask = async () => {
    if (validateTaskName(taskName.name) && validateTaskTime(duration)) {
      setloading(true);
      const createT = await createTask(taskName, 1, duration, true, "stop");
      if (createT.status === 200) {
        setTaskReload(true);
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
        setTimeFormat(false);
        setModalShow(false);
        setTaskReload(false);
        return true;
      }
      setloading(false);
      setDuration("");
      setTaskName("");
      setTimeFormat(false);
      setModalShow(false);
      setTaskReload(false);
      return true;
    }
  };
  // get tasks
  async function getTask() {
    setShowSkleton(true);
    const req = await getDashboardTask();
    if (req.data.length > 0) {
      setOpan(req.data.length);
      setTaskData(req.data);
      setShowSkleton(false);
    } else {
      setTaskData([]);
      setShowSkleton(false);
    }
  }
  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheckedId([...checkId, e.target.id]);
    } else {
      const newArr = checkId.filter((i) => i !== e.target.id);
      setCheckedId(newArr);
    }
  };
  // delete selected task or tasks
  const handleDelete = async () => {
    if (checkId.length > 0) {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const deleteT = await deleteMultiTask(checkId);

            if (deleteT.status === 200) {
              setTaskReload(true);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              handleClose();
              setTaskReload(false);
            } else {
              addToast("Error: Please Try Again!.", {
                appearance: "error",
                autoDismiss: true,
              });
              handleClose();
              setTaskReload(false);
            }
          } catch (error) {
            addToast("Error: Please Try Again!.", {
              appearance: "error",
              autoDismiss: true,
            });
            handleClose();
            setTaskReload(false);
          }
        }
      });
    } else {
      Swal.fire("Please select an item to delete!");
    }
  };
  // validate update form
  const validateTaskUpdateName = (value) => {
    if (!value) {
      setTaskUpdatekError("Task name is required!");
      return false;
    } else {
      setTaskUpdatekError("");
      return true;
    }
  };
  const validateTaskUpdateTime = (value) => {
    if (!value) {
      setErrorUpdate("Task duration is required!");
      return false;
    } else {
      setErrorUpdate("");
      return true;
    }
  };
  // update slected task (only single task)
  const updateSelectedTask = async () => {
    if (
      validateTaskUpdateName(updateTaskName) &&
      validateTaskUpdateTime(updateDuration)
    ) {
      setloading(true);
      const updateTask = await updateDhashboardTask(
        checkId[0],
        updateTaskName,
        updateDuration
      );
      if (updateTask.status === 200) {
        setTaskReload(true);
        setCheckedId([]);
        addToast("Updated susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        setloading(false);
        setUpdateTimeFormat(false);
        setModalShow(false);
      } else {
        addToast("Error Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
        setCheckedId([]);
        setloading(false);
        setUpdateTimeFormat(false);
        setModalShow(false);
        setTaskReload(false);
        return true;
      }
      setCheckedId([]);
      setloading(false);
      setUpdateDuration("");
      setUpdateTaskName("");
      setUpdateTimeFormat(false);
      setModalShow(false);
      setTaskReload(false);
      return true;
    }
  };
  // get data according to selected item for edit
  const handleUpdateTask = async () => {
    if (checkId.length === 1) {
      const oldData = await getTaskById(checkId[0]);
      setOldTaskName({ name: oldData.data.name });
      setOldTaskTime(oldData.data.task_duration);
      setUpdateDuration(oldData.data.task_duration);
      setUpdateTaskName({ name: oldData.data.name });
      if (oldData.data.task_duration.split(":")[0] == "00") {
        setUpdateTimeFormat("min");
      }
      setModalShow(true);
      setNextBreak(false);
      setVacationTime(false);
      setTaskManager(false);
      setTaskManagerUpdate(true);
      setSizeModal("md");
      setTitleModa("Update selected Task");
    } else if (checkId.length > 1) {
      Swal.fire("You can not update more than one item at the same time!");
    } else {
      Swal.fire("Please select an item for edit!");
    }
  };
  const getBreakPlan = async () => {
    const req = await getaAllBreackPlan();
    if (req.length > 0) {
      setBreakPlanData(req);
    } else {
      setBreakPlanData([]);
    }
  };

  const handleCheckOpenClose = (number) => {
    if (number === 1) {
      setStart(start + 1);
      setOpan(opan - 1);
    } else {
      setOpan(opan + 1);
      setStart(start - 1);
    }
  };
  const handleComplete = (val) => {
    setComplete(val);
    setOpan(opan - 1);
    setStart(start - 1);
  };
  const handleMove = (value) => {
    setMove(value);
  };
  // effects
  useEffect(() => {
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
    // getTask();
    getVacationTime();
  }, []);

  useEffect(() => {
    getTask();
  }, [taskReload, complete, move]);
  useEffect(() => {
    const spotToken = localStorage.getItem("spotToken");
    const spotRefresh = localStorage.getItem("spotRefresh");
    if (code) {
      setSearchParams({ hi: "true" });
      fetch(`${API_URL}/spotify/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      }).then(async (response) => {
        if (response.status === 200) {
          const payback = await response.json();
          localStorage.setItem("spotToken", payback.accessToken);
          localStorage.setItem("spotRefresh", payback.refreshToken);
          setShowPlayer(true);
        }
      });
    }
    if (spotToken && spotRefresh) {
      // refresh the token again
      fetch(`${API_URL}/spotify/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: true,
          code: spotRefresh,
        }),
      }).then(async (response) => {
        if (response.status === 200) {
          const payback = await response.json();
          localStorage.setItem("spotToken", payback?.accessToken);
          setShowPlayer(true);
        } else {
          localStorage.removeItem("spotToken");
          localStorage.removeItem("spotRefresh");
        }
      });
    }
  }, [code]);
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
                    setTaskManager(false);
                    setTaskManagerUpdate(false);
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
                    setTaskManagerUpdate(false);
                    setSizeModal("md");
                    setTitleModa("Add New Vacation Time");
                  }}
                >
                  <Icon icon="vaadin:plus" />
                </i>
              }
            />
            <div className="mt-3">
              <span className="vacation-day">
                {vacationData === "noVacation" ? (
                  <span className="vacation-until">Set your vacation time</span>
                ) : vacationData ? (
                  <Countdown
                    date={vacationData.date}
                    renderer={(props) => (
                      <>
                        {props.days === 0 && props.hours === 0 ? (
                          <span className="vacation-until">
                            Injoy your vacation time
                          </span>
                        ) : (
                          <>
                            {" "}
                            <span>
                              {" "}
                              {props.days > 0
                                ? `${props.days + 1} Days`
                                : `${props.hours} Houres`}{" "}
                            </span>
                            <span className="vacation-until">
                              {" "}
                              until {vacationData.name}
                            </span>
                          </>
                        )}
                      </>
                    )}
                    onComplete={() => {
                      if (vacationData != "noVacation") {
                        addToast("It's time for vacation", {
                          appearance: "info",
                        });
                      }
                    }}
                  />
                ) : (
                  <Skeleton count={1} />
                )}
              </span>
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
            {RenderPlayerOrLogin}
            {/* {code ? <Player code={code} /> : <SpotifyLogin />} */}
            {/* muted */}
            {/* <audio controls className="mt-3">
              <source src="/music/1.mp3" type="audio/ogg" />
              <source src="/music/2.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio> */}
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
              subtitle={`${opan < 0 ? 0 : opan} opan, ${
                start < 0 ? 0 : start
              } start.`}
              action={
                <>
                  <i
                    title="Add New Task"
                    onClick={() => {
                      setModalShow(true);
                      setNextBreak(false);
                      setVacationTime(false);
                      setTaskManagerUpdate(false);
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
                      <i className="delete" onClick={handleDelete}>
                        <Icon icon="fluent:delete-24-filled" /> Delete
                      </i>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="reminderNavItem taskManagerNavItem">
                      <i className="edit" onClick={handleUpdateTask}>
                        <Icon icon="ant-design:edit-filled" /> Edit
                      </i>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              }
            />
            <Row className="dashboard-task-manager-row">
              {showSkleton ? (
                <Skeleton count={9} />
              ) : taskData.length > 0 ? (
                taskData.map((t, n) => (
                  <Fragment key={n}>
                    <Row className="task-manager-body pt-0 mt-1 mb-1">
                      <Col xl="7">
                        <Row className="pl-5">
                          <Col xl="1">
                            <Form.Group controlId="formBasicCheckbox">
                              <Form.Check
                                className="check-box "
                                type="checkbox"
                                id={t._id}
                                onChange={handleCheck}
                              />
                            </Form.Group>
                          </Col>
                          <Col xl="11" className="task-manager-text">
                            {t.name}
                          </Col>
                        </Row>
                      </Col>
                      <Col xl="5">
                        <Timer
                          {...t}
                          handleCheckOpenClose={handleCheckOpenClose}
                          handleComplet={handleComplete}
                        />
                      </Col>
                    </Row>
                    <div className="devidre"></div>
                  </Fragment>
                ))
              ) : (
                <span>No task for today</span>
              )}
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
                    setEditData("");
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
                getBreakPlan={getBreakPlan}
              />
              {/* show Breack plan */}
              <div className="break-plan-card">
                {breacPlanData === "" ? (
                  <Skeleton count={6} />
                ) : breacPlanData.length === 0 ? (
                  "No Break Plan"
                ) : (
                  breacPlanData &&
                  breacPlanData.map((data, n) => (
                    <Row key={n} className="mt-3">
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
                                ? editBreakPlan({
                                    id: data._id,
                                    name: data.name,
                                    time: data.time,
                                  })
                                : joinOrNewSuggestForm(
                                    {
                                      id: data.user[0]._id,
                                      breackName: data.name,
                                    },
                                    {
                                      fullName:
                                        currentUser.first_name +
                                        " " +
                                        currentUser.last_name,
                                      breakName: data.name,
                                      breakOwnerId: data.user[0]._id,
                                    }
                                  );
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
                                ? editBreakPlan({
                                    id: data._id,
                                    name: data.name,
                                    time: data.time,
                                  })
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
                            setEditData("");
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
          <ImpotentToDayCard handleMove={handleMove} />
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
                      value={vacationDataInput}
                      onChange={(e) => {
                        setVacationDataInput(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                      time="text"
                      type="name"
                      value={vacationNameInput}
                      onChange={(e) => {
                        setVacationNameInput(e.target.value);
                      }}
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
                    <Form.Control
                      type="text"
                      className={
                        taskError.length > 0
                          ? "red-border-input"
                          : "no-border-input"
                      }
                      name="name"
                      onChange={(e) => {
                        setTaskName({ name: e.target.value });
                      }}
                    />
                    {taskError ? (
                      <div className="invalid-feedback d-block">
                        {taskError}
                      </div>
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
                          className={`form-control taskManagerTime ${
                            error.length > 0
                              ? "red-border-input"
                              : "no-border-input"
                          }`}
                          closeClock
                          format={timeFormat ? "mm:ss" : "hh:mm:ss"}
                          onChange={(value) => {
                            setDuration(value);
                          }}
                          // value={value}
                        />
                        {error ? (
                          <div className="invalid-feedback d-block">
                            {error}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </>
            )}
            {taskManagerUpdate && (
              <>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task name </Form.Label>
                    <Form.Control
                      type="text"
                      className={
                        taskError.length > 0
                          ? "red-border-input"
                          : "no-border-input"
                      }
                      name="name"
                      onChange={(e) => {
                        setUpdateTaskName({ name: e.target.value });
                      }}
                      defaultValue={oldTaskName.name}
                    />
                    {taskUpdateError ? (
                      <div className="invalid-feedback d-block">
                        {taskUpdateError}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Row>
                      <Col xl="4">
                        <Form.Label>Time Format </Form.Label>
                        <Form.Select
                          onChange={(e) => (
                            setUpdateTimeFormat(e.target.value),
                            setOldTaskTime("")
                          )}
                          className="selectTime"
                          aria-label="Default select example"
                        >
                          <option
                            value="houre"
                            selected={oldTaskTime.split(":")[0] != "00"}
                          >
                            Hour
                          </option>
                          <option
                            value="min"
                            selected={oldTaskTime.split(":")[0] == "00"}
                          >
                            Minute
                          </option>
                        </Form.Select>
                      </Col>
                      <Col xl="8">
                        <Form.Label>Time</Form.Label>
                        <TimePicker
                          className={`form-control taskManagerTime ${
                            error.length > 0
                              ? "red-border-input"
                              : "no-border-input"
                          }`}
                          closeClock
                          format={
                            oldTaskTime.split(":")[0] == "00" &&
                            updateTimeFormat === "min"
                              ? "mm:ss"
                              : oldTaskTime.split(":")[0] != "00" &&
                                updateTimeFormat === "min"
                              ? "mm:ss"
                              : "hh:mm:ss"
                          }
                          onChange={(value) => {
                            setUpdateDuration(value);
                          }}
                          value={oldTaskTime}
                        />
                        {errorUpdate ? (
                          <div className="invalid-feedback d-block">
                            {errorUpdate}
                          </div>
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
                disabled={
                  vacationNameInput === "" ||
                  vacationDataInput === "" ||
                  vacationLoader
                    ? true
                    : false
                }
                variant="primary"
                type="button"
                onClick={() => {
                  creatVacationTime();
                }}
              >
                {vacationLoader ? (
                  <Icon fontSize={30} icon="eos-icons:three-dots-loading" />
                ) : (
                  "Create Vacation"
                )}
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
              <Button variant="primary" onClick={handleCreateTask}>
                {loading && duration.length > 0 ? (
                  <BeatLoader />
                ) : (
                  " Create New Task"
                )}
              </Button>
            )}
            {taskManagerUpdate && (
              <Button variant="primary" onClick={updateSelectedTask}>
                {loading && duration.length > 0 ? <BeatLoader /> : " Update"}
              </Button>
            )}
          </>
        }
      />
    </section>
  );
};

export default Dashboard;
