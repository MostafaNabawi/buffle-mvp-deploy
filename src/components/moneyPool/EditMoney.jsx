import style from "./style.module.css";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import CardBody from "./../card/CardBody";
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { useToasts } from "react-toast-notifications";

function EditMoney() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [desc, setDesc] = useState("");
  const [pending, setPending] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (!id) {
      navigate("/money-pool");
    } else {
      fetch(`${API_URL}/money-poll/get-members?eventId=${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const main = await res.json();
          setEventName(main?.name);
          setDesc(main?.description);
          setFetching(false);
        } else {
          setError(true);
          setFetching(false);
        }
      });
    }
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (eventName === "") {
      addToast(
        <FormattedMessage
          defaultMessage="Event name is required!"
          id="event.name.req"
        />
      );
      return;
    }
    setPending(true);
    fetch(`${API_URL}/money-poll/update?id=${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        name: eventName,
        desc: desc,
      }),
    })
      .then((res) => {
        setPending(false);
        if (res.status === 200) {
          // addToast('Poll updaten')
          addToast(
            <FormattedMessage
              defaultMessage="Event updated"
              id="event.update"
            />,
            {
              appearance: "success",
              autoDismiss: 4000,
            }
          );
        }
      })
      .catch((err) => {
        setPending(false);
        addToast(
          <FormattedMessage
            defaultMessage="Server Error."
            id="app.serverError"
          />,
          {
            appearance: "warning",
            autoDismiss: 4000,
          }
        );
      });
  };
  if (fetching) {
    return (
      <Row>
        <Col className="col-6">
          <Card className="event_card">
            <CardBody className={style.new_event}>
              <Row>
                <Icon fontSize={24} icon="eos-icons:loading" />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
  if (error) {
    return (
     <Row>
       <Col className="col-6">
       <Card className="event_card">
        <CardBody className={style.new_event}>
          <Row>
            <FormattedMessage
              defaultMessage="Sorry , Server Error"
              id="app.serverError"
            />
          </Row>
        </CardBody>
      </Card>
       </Col>
     </Row>
    );
  }
  return (
    <Row>
      <Col className="col-6">
        <Card className="event_card">
          <CardBody className={style.new_event}>
            <Row>
              <Col lg={6}>
                <Form onSubmit={handleEdit}>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="eventName">
                      <Form.Label>
                        <FormattedMessage
                          id="event.name"
                          defaultMessage="Event name"
                        />{" "}
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setEventName(e.target.value);
                        }}
                        value={eventName}
                        type="text"
                        placeholder="Birthday"
                        disabled={pending}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>
                        <FormattedMessage
                          id="label.desc"
                          defaultMessage="Description"
                        />{" "}
                      </Form.Label>
                      <FormattedMessage
                        id="place.descOp"
                        defaultMessage="Description(optional)"
                      >
                        {(msg) => (
                          <Form.Control
                            as="textarea"
                            rows={1}
                            value={desc || ""}
                            onChange={(e) => {
                              setDesc(e.target.value);
                            }}
                            placeholder={msg}
                            disabled={pending}
                          />
                        )}
                      </FormattedMessage>
                    </Form.Group>
                  </Col>
                  <Button className="mt-3" type="submit" disabled={pending}>
                    {pending ? (
                      <Icon fontSize={24} icon="eos-icons:loading" />
                    ) : (
                      <FormattedMessage
                        id="event.update"
                        defaultMessage="Update Event"
                      />
                    )}
                  </Button>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default EditMoney;
