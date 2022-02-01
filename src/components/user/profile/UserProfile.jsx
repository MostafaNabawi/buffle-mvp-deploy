import { React, useEffect, useState } from "react";
import Select from "react-select";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../../config";

const UserProfile = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [userData, setUserData] = useState({});

  const handleEdite = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const email = form.get("email");
    const slack = form.get("slack");
    const departure = form.get("departure");
    const tags = form.get("tags");
    console.log("ta...", tags);
    return "";
    if (firstName && lastName && email && slack && departure) {
      setLoading(true);
      try {
        fetch(`${API_URL}/money-poll/join-event`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: firstName,
          }),
        }).then((res) => {
          if (res.status === 200) {
            addToast("Edited Successfully!", {
              appearance: "warning",
              autoDismiss: 4000,
            });
          } else {
            addToast("Oops, Error please try agian!", {
              appearance: "warning",
              autoDismiss: 4000,
            });
          }
        });
      } catch {}
    } else {
      addToast("All field is required!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return "";
    }
  };
  useEffect(() => {
    const user_storage = JSON.parse(localStorage.getItem("user"));
    setUserData(user_storage);
  }, []);
  return (
    <>
      <Col className="card" xl={8}>
        <h1 className={`${style.title} text-center`}>Your Account</h1>
        <Form onSubmit={handleEdite}>
          <Row>
            <Form.Group className="mb-3" >
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
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First  name"
                  value={userData?.first_name}
                  name="firstName"
                />
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={userData?.last_name}
                  name="lastName"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={userData?.email}
                  name="email"
                />
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Group className="mb-3">
                <Form.Label>Slack:</Form.Label>
                <Form.Control type="text" placeholder="Slack" name="slack" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <Form.Group className="mb-3">
                <Form.Label>Departure</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Departure"
                  name="departure"
                />
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
