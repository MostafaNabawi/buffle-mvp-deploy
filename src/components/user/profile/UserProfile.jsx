import { React, useEffect, useState } from "react";
import Select from "react-select";
import { Row, Col, Image, Form, Button, InputGroup } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../../config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from "../../modal/modal";

const UserProfile = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  //
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
  };
  //

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [slack, setSlack] = useState("");
  const [departure, setDeparture] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [options, setOptions] = useState([]);

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
  const getAllTags = () => {
    fetch(`${API_URL}/tags/get-all-tags`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const { payload } = await res.json();
      if (payload) {
        payload.map((tag) => {
          const data = {
            value: tag._id,
            label: tag.name + " " + `(${tag?.count || 0})`,
          };
          options.push(data);
        });
      }
    });
  };
  const getUserTags = async () => {
    fetch(`${API_URL}/user/tags`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const { payload } = await res.json();
      if (payload) {
        payload.map((item) => {
          const data = {
            value: item.tag[0]._id,
            label: item.tag[0].name,
          };
          tags.push(data);
        });
      }
    });
  };
  const handleEdite = async (e) => {
    e.preventDefault();

    if (firstName && lastName && email) {
      setLoading(true);
      try {
        if (tags.length > 0) {
          const res = await fetch(`${API_URL}/tags/create`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tags: tags,
            }),
          });
          if (res.status != 200) {
            addToast("Error Please Try Again!", {
              appearance: "warning",
              autoDismiss: 4000,
            });
            setLoading(false);
            return false;
          }
        }
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
            const headerName = document.getElementById("userFullName");
            headerName.innerHTML = firstName + " " + lastName;
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
      addToast("Please fill all required field (*)!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return "";
    }
  };
  const handleTag = () => {
    if (!newTag) {
      return "";
    }
    const tagOption = [{ value: "", label: newTag }];
    tags.push(tagOption[0]);
    setNewTag("");
    handleClose();
  };

  useEffect(() => {
    getUser();
    getAllTags();
    getUserTags();
  }, []);

  return (
    <>
      <Col className="card" xl={8}>
        <h1 className={`${style.title} text-center`}>Your Account</h1>
        <Form onSubmit={handleEdite}>
          <Row>
            <Col xl={4}>
              <Form.Group className="mb-3">
                <Image className={style.userPhoto} src="/img/user-3.png" />
                <Form.Label className={style.lablePhoto} htmlFor="photoUser">
                  <Icon icon="uil:image-upload" />
                </Form.Label>
                <Form.Control
                  className={style.hide}
                  id="photoUser"
                  type="file"
                />
              </Form.Group>
            </Col>
            <Col xl={8} className="pt-5">
              <h1 className={`${style.title}`}>
                <span>{firstName + " " + lastName}</span>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Form.Group className="mb-3">
                {!busy ? (
                  <Skeleton height={50} count={1} />
                ) : (
                  <>
                    <Form.Label>First name *</Form.Label>
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
                    <Form.Label>Last Name *</Form.Label>
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
                    <Form.Label>Email address *</Form.Label>
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
              <InputGroup className="mb-3">
                <Select
                  className="selectTags"
                  value={tags}
                  onChange={(e) => {
                    setTags(e);
                  }}
                  isSearchable
                  options={options}
                  isMulti
                  name="tags"
                />
                <Button
                  onClick={() => setModalShow(true)}
                  variant="outline-secondary"
                  id="button-addon1"
                  className="btnAdd"
                >
                  <Icon icon="carbon:add" />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Button className={style.btnUpdate} type="submit">
            {loading ? <Icon icon="eos-icons:loading" /> : "Update Profile"}
          </Button>
        </Form>
      </Col>
      <Modal
        // size={"sm"}
        show={modalShow}
        handleClose={handleClose}
        title={"Add new tag to your profile"}
        body={
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New Tag </Form.Label>
              <Form.Control
                name="tag"
                type="text"
                value={newTag}
                placeholder="Tag"
                onChange={(e) => {
                  setNewTag(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleTag();
              }}
            >
              Add
            </Button>
          </>
        }
      />
    </>
  );
};

export default UserProfile;
