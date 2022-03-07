import { React, useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../../config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from "../../modal/modal";
import { DotLoader } from "react-spinners";
import { FormattedMessage } from "react-intl";
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
  const [departure, setDeparture] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [options, setOptions] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [imgError, setImgError] = useState("");
  const preview = useRef();
  const [file, setFile] = useState(null);
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
      if (file) {
        handleHeaderRefresh();
      }
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
        let formatted = [];
        payload.map((tag) => {
          formatted.push({
            value: tag._id,
            label: tag.name + " " + `(${tag?.count || 0})`,
          });
        });
        setOptions([...options, ...formatted]);
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
        let data = [];
        payload.map((item) => {
          data.push({
            value: item.tag[0]._id,
            label: item.tag[0].name,
          });

          // tags.push(data);
        });
        setTags([...tags, ...data]);
      }
    });
  };
  const handleEdite = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", firstName);
      formData.append("lastName", lastName);
      formData.append("departure", departure);
      formData.append("email", email);
      // update tags
      if (tags.length > 0) {
        const res = await fetch(`${API_URL}/tags/create-user`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tags: tags,
          }),
        });
        if (res.status !== 200) {
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />,
            {
              appearance: "warning",
              autoDismiss: 4000,
            }
          );
          setLoading(false);
          return false;
        }
      }
      // upload form data
      fetch(`${API_URL}/user/update`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      })
        .then(async (res) => {
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
        })
        .catch((err) => {
          setLoading(false);
        });
      //end upload
    } else if (firstName && lastName && email) {
      setLoading(true);
      try {
        if (tags.length > 0) {
          const res = await fetch(`${API_URL}/tags/create-user`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tags: tags,
            }),
          });
          if (res.status !== 200) {
            addToast(
              <FormattedMessage
                defaultMessage="Error Please Try Again."
                id="breakPlan.Error"
              />,
              {
                appearance: "warning",
                autoDismiss: 4000,
              }
            );
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
      addToast(
        <FormattedMessage
          id="app.requiredAll"
          defaultMessage="Please fill all required field (*)."
        />,
        {
          appearance: "warning",
          autoDismiss: 4000,
        }
      );
      return "";
    }
  };
  const handleTag = () => {
    if (!newTag) {
      return "";
    }
    setAddLoading(true);
    fetch(`${API_URL}/tags/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag: newTag }),
    }).then(async (response) => {
      if (response.status === 200) {
        const { payload } = await response.json();
        let formatted = [];
        payload.map((tag) => {
          formatted.push({
            value: tag._id,
            label: tag.name + " " + `(${tag?.count || 0})`,
          });
        });
        setOptions([...options, ...formatted]);
        setAddLoading(false);
        addToast(
          <FormattedMessage
            id="tag.added"
            defaultMessage="Tag added to list"
          />,
          {
            appearance: "success",
            autoDismiss: 5000,
          }
        );
        handleClose();
      } else {
        setAddLoading(false);
        addToast(
          <FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />,
          {
            appearance: "error",
            autoDismiss: 5000,
          }
        );
        handleClose();
      }
    });
    handleClose();
  };
  const handleHeaderRefresh = (e) => {
    // FileReader support
    if (FileReader) {
      var fr = new FileReader();
      fr.onload = function () {
        preview.current.src = fr.result;
        document.getElementById("header-img").setAttribute("src", fr.result);
        document.getElementById("header-img").style.borderRadius = "50%";
        document.getElementById("header-img").style.objectFit = "cover";
      };
      fr.readAsDataURL(file);
    } else {
      alert("Image upadted please refresh ✔");
    }
  };
  const handlePreview = (e) => {
    let files = e.target.files;
    const length = Math.ceil(files[0].size / 1024);
    const type = files[0].type;
    if (!type.includes("image")) {
      setImgError(
        <FormattedMessage
          defaultMessage="Only image files must upload."
          id="img.error"
        />
      );
      return;
    } else {
      setImgError("");
    }
    // max file size 3MB
    if (length > 3072) {
      setImgError(
        <FormattedMessage
          defaultMessage="Maximum image size is 3MB."
          id="img.sizeError"
        />
      );
      return;
    } else {
      setImgError("");
    }
    setFile(files[0]);
    // FileReader support
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        preview.current.src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    } else {
      alert("Image selected ✔");
    }
  };
  useEffect(() => {
    const element = document.getElementById("header-img")?.getAttribute("src");
    if (element?.includes("blob")) {
      preview.current.src = element;
    }
    getUser();
    getAllTags();
    getUserTags();
  }, []);

  return (
    <>
      <Col className="card" xl={8}>
        <h1 className={`${style.title} text-center`}>
          {" "}
          <FormattedMessage defaultMessage="Your Account" id="acc.your" />{" "}
        </h1>
        <Form onSubmit={handleEdite} encType="multipart/form-data">
          <Row>
            <Col xl={4}>
              <Form.Group className="mb-3">
                <Image
                  className={style.userPhoto}
                  src="/img/user-3.png"
                  ref={preview}
                  style={{
                    borderRadius: "50%",
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
                <Form.Label className={style.lablePhoto} htmlFor="photoUser">
                  <Icon icon="uil:image-upload" />
                </Form.Label>
                <Form.Control
                  className={style.hide}
                  id="photoUser"
                  type="file"
                  accept="image/jpg , image/png , image/jpeg"
                  name="image"
                  onChange={handlePreview}
                />
              </Form.Group>
              {imgError !== "" && <Alert variant="danger">{imgError}</Alert>}
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
                    <Form.Label>
                      <FormattedMessage
                        defaultMessage="First name"
                        id="user.fname"
                      />{" "}
                      *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
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
                    <Form.Label>
                      {" "}
                      <FormattedMessage
                        defaultMessage="Last Name"
                        id="user.lname"
                      />
                      *
                    </Form.Label>
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
                    <Form.Label>
                      <FormattedMessage
                        defaultMessage="Email address"
                        id="user.email"
                      />
                      *
                    </Form.Label>
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
                    <Form.Label>
                      <FormattedMessage
                        defaultMessage="Departure"
                        id="user.departure"
                      />
                    </Form.Label>
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
          </Row>
          <Row>
            <Col md={12}>
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
            {loading ? (
              <Icon icon="eos-icons:loading" />
            ) : (
              <FormattedMessage
                defaultMessage="Update profile"
                id="user.updateProfile"
              />
            )}
          </Button>
        </Form>
      </Col>
      <Modal
        // size={"sm"}
        show={modalShow}
        handleClose={handleClose}
        title={
          <FormattedMessage
            defaultMessage="Add a new tag to your profile"
            id="user.addNewTag"
          />
        }
        body={
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <FormattedMessage defaultMessage="New Tag" id="user.newTag" />
              </Form.Label>
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
            <Button
              variant="primary"
              onClick={() => {
                handleTag();
              }}
              disabled={addLoading}
            >
              {addLoading ? (
                <DotLoader size={10} />
              ) : (
                <FormattedMessage defaultMessage="Add" id="btn.add" />
              )}
            </Button>
            <Button
              variant="outline-dark"
              disabled={addLoading}
              onClick={handleClose}
            >
              <FormattedMessage defaultMessage="Close" id="btn.close" />
            </Button>
          </>
        }
      />
    </>
  );
};

export default UserProfile;
