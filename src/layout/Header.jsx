import { React, useState, useEffect } from "react";
import { Row, Col, Form, Image, NavDropdown, Button,Badge  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { logout, userStatus } from "../api";
import { API_URL } from "../config/index";
import Countdown from "react-countdown";
import Notify from "../components/notification/Notify";

const Header = () => {
  const [userData, setUserData] = useState({});
  const [notification, setNotificatiion] = useState('')
  const [loadData,setLoadData]=useState(false)
  const navigate = useNavigate();
  const [du_time, setDu_time] = useState(0);
  const [dis_time, setDis_time] = useState(0);
  const [start, setStart] = useState(true);

  const handleLogout = async () => {
    const req = await logout();
    if (req.status === 200) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  const handleDurationTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    setDu_time(time);
  };
  const handleDisplayTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    setDis_time(time);
  };
  const getNotification = async (load) => {
    if(load){
      console.log("yes")
      await fetch(`${API_URL}/user/notification`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        const { payload } = await res.json()
        if (payload.length > 0) {
          setNotificatiion(payload)
        }
      })
    }else{
      setNotificatiion('')
    }
  }
  useEffect(() => {
    async function getStatus() {
      const req = await userStatus();
      if (req.status !== 200) {
        localStorage.removeItem("user");
        navigate("/");
      }
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
          handleDurationTime(payload.duration);
          handleDisplayTime(payload.display);
        }
      }
    }
    // getNotification();
    getNotification();
    getScrrenRemainder();
    const user_storage = JSON.parse(localStorage.getItem("user"));
    setUserData(user_storage);
    if (user_storage) {
      // check status
      getStatus();
    } else {
      navigate("/");
    }
  }, []);
  console.log("no", notification)
  console.log("data",loadData)
  return (
    <>
      <Col className="col-12 header-name text-capitalize">
        Hi {userData?.first_name}
      </Col>
      {du_time > 0 && start && (
        <Countdown
          date={Date.now() + du_time}
          onComplete={() => {
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
        className={`lockScreen text-center ${!start ? "" : "lockScreenHide"}`}
      >
        <h1>Screen Lock For</h1>
        {du_time > 0 && !start && (
          <Countdown
            date={Date.now() + dis_time}
            onComplete={() => {
              setStart(true);
            }}
          // renderer={() => {
          //   return ""
          // }}
          />
        )}
      </div>

      <Row className="mb-4">
        <Col className="col-6 text-secondary-dark header-thank mt-3">
          Thank god it’s friday!
        </Col>
        <Col className="col-6 header-col-left">
          <div className="header-icon navy-blue text-center pt-2">
            <NavDropdown
              title={
                <>
                   <Badge className="notify-badge" pill bg="danger">
                    0
                  </Badge>
                  <Image
                    onClick={() =>{
                      setLoadData(!loadData)
                      getNotification(!loadData)
                    }}
                    className="sidebar-icon"
                    src="/icone/hcphotos-Headshots-1 2.png"
                  />
               
                </>
              }
              className="navDropdomnIcon notiy "
            >
              <div className="card p-2 card-notify">
                <Notify
                  name="Raj Kumar"
                  message="want to see your break plan"
                  footer={
                    <>
                      <Button variant="outline-success" className={`btn-notify`}>Accept</Button>
                      <Button variant="outline-secondary" className={`btn-notify`}>Reject</Button>
                    </>
                  }
                />
                <Notify
                  name="Raj Kumar"
                  message="want to join to your break plan"
                  footer={
                    <>
                      <Button variant="outline-success" className={`btn-notify`}>Accept</Button>
                      <Button variant="outline-secondary" className={`btn-notify`}>Reject</Button>
                    </>
                  }
                />
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
              <NavDropdown.Item href="/dashboard/user-management">
                User management
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/setting">
                Setting
              </NavDropdown.Item>
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
