import { React, useEffect, useState } from "react";
import Select from "react-select";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../../config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfile = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [slack, setSlack] = useState("");
  const [departure, setDeparture] = useState("");
  const [tags, setTags] = useState([]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const setUsetLocalStorage = () => {
    try {
      fetch(`${API_URL}/user/me`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const { payload } = await res.json();
          localStorage.setItem("user", JSON.stringify(payload));
        } else {
          setBusy(true);
        }
      });
    } catch {}
  };
  const getUser = () => {
    try {
      setBusy(true);
      fetch(`${API_URL}/user/me`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const { payload } = await res.json();
          setFirstName(payload.first_name);
          setLastName(payload.last_name);
          setEmail(payload.email);
          setSlack(payload.slack);
          setDeparture(payload.departure);
          setBusy(true);
        } else {
          setBusy(true);
        }
      });
    } catch {
      setBusy(true);
    }
  };
  const handleEdite = (e) => {
    e.preventDefault();
    // const form = new FormData(e.currentTarget);
    // const firstName = form.get("firstName");
    // const lastName = form.get("lastName");
    // const email = form.get("email");
    // const slack = form.get("slack");
    // const departure = form.get("departure");

    if (firstName && lastName && email && slack && departure) {
      setLoading(true);
      try {
        fetch(`${API_URL}/user/update`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: firstName,
            lastName: lastName,
            slack: slack,
            departure: departure,
            email: email,
          }),
        }).then(async (res) => {
          const { msg } = await res.json();
          if (res.status === 200) {
            setUsetLocalStorage();
            addToast(msg, {
              appearance: "success",
              autoDismiss: 4000,
            });
            setLoading(false);
          } else {
            addToast(msg, {
              appearance: "warning",
              autoDismiss: 4000,
            });
            setLoading(false);
          }
        });
      } catch {
        setLoading(false);
      }
    } else {
      addToast("All field is required!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return "";
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Col className="card" xl={8}>
        <h1 className={`${style.title} text-center`}>Your Account</h1>
        <Form onSubmit={handleEdite}>
          <Row>
            <Form.Group className="mb-3">
              <Image className={style.userPhoto} src="/img/user-3.png" />
              <Form.Label className={style.lablePhoto} for="photoUser">
                <Icon icon="uil:image-upload" />
              </Form.Label>
              <Form.Control className={style.hide} id="photoUser" type="file" />
            </Form.Group>
          </Row>
          <Row>
            <Col xl={6}>
              <Form.Group className="mb-3">
                {!busy ? (
                  <Skeleton height={50} count={1} />
                ) : (
                  <>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First  name"
                      value={firstName}
                      name="firstName"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </>
                )}
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Group className="mb-3">
                {!busy ? (
                  <Skeleton height={50} count={1} />
                ) : (
                  <>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      name="lastName"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Form.Group className="mb-3">
                {!busy ? (
                  <Skeleton height={50} count={1} />
                ) : (
                  <>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </>
                )}
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Group className="mb-3">
                {!busy ? (
                  <Skeleton height={50} count={1} />
                ) : (
                  <>
                    <Form.Label>Slack:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Slack"
                      name="slack"
                      value={slack}
                      onChange={(e) => {
                        setSlack(e.target.value);
                      }}
                    />
                  </>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Form.Group className="mb-3">
                {!busy ? (
                  <Skeleton height={50} count={1} />
                ) : (
                  <>
                    <Form.Label>Departure</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Departure"
                      name="departure"
                      value={departure}
                      onChange={(e) => {
                        setDeparture(e.target.value);
                      }}
                    />
                  </>
                )}
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Label>Tags</Form.Label>
              <Select
                value={tags}
                onChange={(e) => {
                  setTags(e);
                }}
                options={options}
                isMulti
                name="tags"
              />
            </Col>
          </Row>
          <Button className={style.btnUpdate} type="submit">
            {loading ? <Icon icon="eos-icons:loading" /> : "Update Profile"}
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default UserProfile;
