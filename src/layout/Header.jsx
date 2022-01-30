import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Image,
  NavDropdown,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  Button,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { logout, userStatus } from "../api";
import { API_URL } from "../config/index";
import Countdown from "react-countdown";
import Notify from "../components/notification/Notify";
import { useToasts } from "react-toast-notifications";
import { ioInstance } from "../config/socket";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDu_time,
  setDefault,
  setDis_time,
} from "../store/screenReminderSclice";
import moment from "moment";
import Swal from "sweetalert2";

const Header = () => {
  //
  const { du_time, defaultTime, dis_time } = useSelector(
    (state) => state.screen
  );
  //
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  // const { switched, type } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [notification, setNotificatiion] = useState("");
  const [count, setCount] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(true);
  const [showUserRoute, setShowUserRoute] = useState(false);
  const [webData, setWebData] = useState("");
  const [workspace, setWorkSpaces] = useState([]);
  const [getCurrent, setCurrent] = useState(
    JSON.parse(localStorage.getItem("search"))
  );
  const handleLogout = async () => {
    const req = await logout();
    if (req.status === 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("search");
      navigate("/");
    }
  };
  const handleDurationTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    // setDu_time(time);
    dispatch(setDu_time(time));
    return time;
  };
  const handleDisplayTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    // setDis_time(time);
    dispatch(setDis_time(time));
    return time;
  };
  // Notification
  const getNotification = async (load) => {
    if (load) {
      setLoading(true);
      await fetch(`${API_URL}/user/notification`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        const { payload } = await res.json();
        if (payload.length > 0) {
          setNotificatiion(payload);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }
  };
  const countNotification = async () => {
    await fetch(`${API_URL}/user/count-notification`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }).then(async (res) => {
      const { payload } = await res.json();
      setCount(payload);
    });
  };
  // accept Joni
  const handleAccept = async (id, from) => {
    const user = JSON.parse(localStorage.getItem("user"));
    await fetch(`${API_URL}/breakPlan/accept`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        to: from,
        notId: id,
        fullName: user.first_name + " " + user.last_name,
      }),
    }).then(async (res) => {
      if (res.status) {
        getNotification(true);
      }
    });
  };
  // Rejeact
  const handleReject = async (id) => {
    await fetch(`${API_URL}/breakPlan/reject`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        notId: id,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        getNotification(true);
      }
    });
  };
  //
  const handleAcceptTime = async (id, userId, newTime, breakId, breakName) => {
    const el = document.getElementById(breakId);
    const user = JSON.parse(localStorage.getItem("user"));
    await fetch(`${API_URL}/breakPlan/accept-time`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        fullName: user.first_name + " " + user.last_name,
        to: userId,
        notId: id,
        time: newTime,
        breakId: breakId,
        breakName: breakName,
      }),
    }).then(async (res) => {
      if (res.status) {
        el.innerHTML = newTime;
        getNotification(true);
      }
    });
  };
  // Clear All Notification
  const clearAll = async () => {
    if (notification.length > 0 && !loading) {
      try {
        setLoading(true);
        await fetch(`${API_URL}/user/clear-all`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }).then((res) => {
          if (res.status == 200) {
            addToast("Cleared", { autoDismiss: true, appearance: "success" });
            setNotificatiion([]);
            setLoading(false);
          } else {
            addToast("Error Please Try Again!", {
              autoDismiss: true,
              appearance: "error",
            });
            setLoading(false);
          }
        });
      } catch {
        addToast("server Error Please Try Again!", {
          autoDismiss: true,
          appearance: "error",
        });
      }
    }
  };
  const handleSwitch = async (space) => {
    Swal.fire({
      title: "Loading...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      showConfirmButton: false,
      html: `<div aria-busy="true" class="">
          <svg width="40" height="40" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" aria-label="audio-loading"><defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color="green" stop-opacity="0" offset="0%"></stop><stop stop-color="green" stop-opacity=".631" offset="63.146%"></stop><stop stop-color="green" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)"><path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="green" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path><circle fill="#fff" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle></g></g></svg>
          </div>`,
      customClass: { container: "swal-google" },
    });
    const changer = await fetch(`${API_URL}/auth/login/switch`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: space?.space_data[0]?._id,
      }),
    });
    if (changer.status === 200) {
      const before = JSON.parse(localStorage.getItem("space"));
      localStorage.setItem("space", JSON.stringify("m"));
      window.location.href = `/dashboard/true/${before}`;
    }
  };
  useEffect(() => {
    if (webData.length > 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?._id === webData) {
        //notification related to this user
        setCount(count + 1);
        setWebData("");
      }
    }
  }, [webData]);

  useEffect(() => {
    async function getStatus() {
      const req = await userStatus();
      if (req.status !== 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("others");
        navigate("/");
      }
      // console.log("current status => ", req.current);
    }
    async function getScrrenRemainder() {
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
          dispatch(setDefault(payload.duration));
          handleDurationTime(payload.duration);
          handleDisplayTime(payload.display);
        } else {
          localStorage.setItem("screen", "of");
          dispatch(setDefault(payload.duration));
          handleDurationTime(payload.duration);
          handleDisplayTime(payload.display);
        }
      } else {
        localStorage.setItem("screen", "of");
        setDefault("00:10:00");
        handleDurationTime("00:10:00");
        handleDisplayTime("00:01:00");
      }
    }
    countNotification();
    getScrrenRemainder();
    const user_storage = JSON.parse(localStorage.getItem("user"));
    const space = JSON.parse(localStorage.getItem("space"));
    // const others = JSON.parse(localStorage.getItem("others"));
    // if (others && others?.length > 0) {
    //   setWorkSpaces(others);
    // }
    if (space === "c" || space === "a") {
      setShowUserRoute(true);
    }
    setUserData(user_storage);
    if (user_storage) {
      ioInstance.on("connect_error", (err) => {
        console.error("socket error!", err);
        ioInstance.close();
      });
      ioInstance.on("notify", (data) => {
        setWebData(data);
      });

      // check status
      getStatus();
    } else {
      navigate("/");
    }
    return () => {
      ioInstance.close();
    };
  }, []);
  // useEffect(() => {
  //   console.log("get current", switched, type);
  //   if (switched) {
  //     // if(type === "f" || type === "s" || type === "c"){
  //     //   fetch(`${API_URL}/user/own?` ,{
  //     //     method : 'GET',
  //     //     credentials : 'include',
  //     //   })
  //     // }
  //   }
  // }, [switched]);
  return (
    <>
      <Col className="col-12 header-name text-capitalize">
        Hi {userData?.first_name}
      </Col>
      {du_time > 0 && start && (
        <Countdown
          date={Date.now() + du_time}
          onTick={(e) => {
            dispatch(setDu_time(e.total));
          }}
          onComplete={() => {
            handleDurationTime(defaultTime);
            setStart(false);
            const timeLock = new Date();
            localStorage.setItem(
              "loackTime",
              timeLock.getHours() +
              ":" +
              timeLock.getMinutes() +
              ":" +
              timeLock.getSeconds()
            );
          }}
          renderer={() => {
            return "";
          }}
        />
      )}

      <div
        id="lockScreenHide"
        className={`${localStorage.getItem("screen") === "on" ? "lockScreen" : ""
          } text-center ${!start ? "" : "lockScreenHide"}`}
      >
        {localStorage.getItem("screen") === "on" && du_time > 0 && !start ? (
          <div className="screenDiv">
            <h1>Screen Lock For</h1>
            <Countdown
              date={Date.now() + dis_time}
              onComplete={() => {
                setStart(true);
              }}
            // renderer={() => {
            //   return ""
            // }}
            />
          </div>
        ) : (
          ""
        )}
        {du_time > 0 && !start && (
          <Countdown
            date={Date.now() + dis_time}
            onComplete={() => {
              setStart(true);
            }}
            renderer={() => {
              return "";
            }}
          />
        )}
      </div>

      <Row className="mb-4">
        <Col className="col-6 text-secondary-dark header-thank mt-3">
          Thank god it’s {moment(Date.now()).format("dddd")}!
        </Col>
        <Col className="col-6 header-col-left">
          <div className="header-icon navy-blue text-center pt-2">
            <NavDropdown
              title={
                <>
                  <Badge className="notify-badge" pill bg="danger">
                    {count}
                  </Badge>
                  <Image
                    onClick={() => {
                      setLoadData(!loadData);
                      getNotification(!loadData);
                    }}
                    className="sidebar-icon"
                    src="/icone/hcphotos-Headshots-1 2.png"
                  />
                </>
              }
              className="navDropdomnIcon notiy "
            >
              <div className="card p-2 card-notify">
                <a
                  onClick={() => {
                    clearAll();
                  }}
                  className="clear-all text-center"
                >
                  Clear all
                </a>
                {loading ? (
                  <div className="text-center pt-4 pb-4">
                    <Skeleton className="mb-2" height="34px" count={4} />
                  </div>
                ) : notification.length > 0 ? (
                  notification.map((notify) =>
                    notify.type === "invite" ? (
                      <Notify
                        key={notify._id}
                        name={notify.firstName + " " + notify.lastName}
                        date={notify.date}
                        message={notify.msg}
                        footer={
                          <>
                            <Button
                              onClick={() => {
                                //
                                handleAccept(notify._id, notify.from);
                              }}
                              variant="outline-success"
                              className={`btn-notify`}
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => {
                                handleReject(notify._id);
                              }}
                              variant="outline-secondary"
                              className={`btn-notify`}
                            >
                              Reject
                            </Button>
                          </>
                        }
                      />
                    ) : notify.type == "report" ? (
                      <Notify
                        key={notify._id}
                        name={notify.sender}
                        date={notify.date}
                        message={notify.msg}
                        footer=""
                      />
                    ) : notify.type === "new-time" ? (
                      <Notify
                        key={notify._id}
                        name={notify.sender}
                        date={notify.date}
                        message={notify.msg}
                        footer={
                          <>
                            <Button
                              onClick={() => {
                                handleAcceptTime(
                                  notify._id,
                                  notify.user_id,
                                  notify.newTime,
                                  notify.breakId,
                                  notify.breakName
                                );
                              }}
                              variant="outline-success"
                              className={`btn-notify`}
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => {
                                handleReject(notify._id);
                              }}
                              variant="outline-secondary"
                              className={`btn-notify`}
                            >
                              Reject
                            </Button>
                          </>
                        }
                      />
                    ) : (
                      ""
                    )
                  )
                ) : (
                  <div className="text-center pt-2 pb-2">No Notification</div>
                )}
              </div>
            </NavDropdown>
          </div>
          <div className="header-icon navy-blue text-center pt-2">
            <NavDropdown
              title={
                <Image
                  className="sidebar-icon"
                  src="/icone/hcphotos-Headshots-1 1.png"
                />
              }
              className="navDropdomnIcon"
            >
              <NavDropdown.Item href="/dashboard/profile">
                Profile
              </NavDropdown.Item>
              {workspace.length > 0 && (
                <DropdownButton
                  as={ButtonGroup}
                  id={`dropdown-button-drop-start`}
                  drop="start"
                  className="subDropdown"
                  title="Workspace"
                >
                  {workspace?.map((space, i) => (
                    <Dropdown.Item
                      key={`space-${i}`}
                      onClick={() => handleSwitch(space)}
                    >
                      {space?.space_data[0]?.space_name}
                    </Dropdown.Item>
                  ))}
                  {/* <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    Something else here
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
                </DropdownButton>
              )}

              {/*  */}
              {showUserRoute && (
                <NavDropdown.Item href="/dashboard/user-management">
                  User management
                </NavDropdown.Item>
              )}
              {showUserRoute && (
                <NavDropdown.Item href="/dashboard/setting">
                  Settings
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="form-search">
            <Form>
              <Form.Group
                className="mb-3 serach-input input-group"
                controlId="formBasicEmail"
              >
                <i className="search-icon">
                  <Icon icon="ci:search-small" />
                </i>
                <Form.Control
                  className="search-input2"
                  type="search"
                  placeholder="search"
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Header;
