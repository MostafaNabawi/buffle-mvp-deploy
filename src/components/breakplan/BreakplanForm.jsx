import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { CreateNewPlan } from "../../api/breackPlan";
import style from "./style.module.css";
import { useToasts } from "react-toast-notifications";
import Loader from "react-spinners/BeatLoader";
import { FormattedMessage } from "react-intl";
import { API_URL } from "../../config";

function BreackplanFrom({
  show,
  setShow,
  newTime,
  joinOrSagest,
  invateForm,
  timeData,
  breackPlanName,
  editData,
  setEditData,
  suggestData,
  joindata,
  getBreakPlan,
}) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { addToast } = useToasts();
  const [loading, setloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  //
  const [close, setClose] = useState(true);
  const [newSaggestion, setNewSaggestion] = useState(false);
  // Create Plane
  const [newSuggestInput, setNewSuggestInput] = useState("");
  const [newSuggestInputError, setNewSuggestInputError] = useState("");
  const [newSuggestTime, setNewSuggestTime] = useState("");
  const [SuggestTimeError, setSuggestTimeError] = useState(false);
  const [newBreak, setNewBreak] = useState({ title: "", createIime: "" });
  // invit
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  function checkEmail(value) {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      setEmailError("error");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }
  useEffect(() => {
    if (show) {
      setClose(false);
    }
    if (editData) {
      setNewBreak({ title: editData.name, createIime: editData.time });
    }
  }, [show]);
  // create Breack plan
  const handleCreatePlan = async (e) => {
    e.preventDefault();
    if (newBreak.title != "" && newBreak.createIime != "") {
      setloading(true);
      const { status } = await CreateNewPlan(newBreak);
      if (status === 200) {
        getBreakPlan();
        addToast(
          <FormattedMessage
            defaultMessage="New breack plan created Susseccfully"
            id="breakPlan.creatSusseccfully"
          />,
          {
            autoDismiss: true,
            appearance: "success",
          }
        );
        setNewBreak({ ...newBreak, ["title"]: "", ["createIime"]: "" });
        setShow(false);
        setClose(true);
        setloading(false);
      } else {
        addToast(
          <FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />,
          {
            autoDismiss: false,
            appearance: "error",
          }
        );
        setloading(false);
      }
    }
  };
  // edit Breack Plan
  const handleEditPlan = async (e) => {
    e.preventDefault();
    const break_name_el = document.getElementById(
      currentUser._id + editData.name.trim()
    );
    const break_time_el = document.getElementById(editData.id);
    if (newBreak.title != "" && newBreak.createIime != "") {
      try {
        setloading(true);
        await fetch(`${API_URL}/breakPlan/update`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            breakPlanId: editData.id,
            time: newBreak.createIime,
            name: newBreak.title,
          }),
        }).then((res) => {
          if (res.status === 200) {
            break_name_el.innerHTML = newBreak.title;
            break_time_el.innerHTML = newBreak.createIime;
            addToast(<FormattedMessage id="msg.editSuccess" defaultMessage="Edited Successfully" />, {
              autoDismiss: true,
              appearance: "success",
            });
            setNewBreak({ ...newBreak, ["title"]: "", ["createIime"]: "" });
            setShow(false);
            setClose(true);
            setloading(false);
          } else {
            addToast(
              <FormattedMessage
                defaultMessage="Error Please Try Again."
                id="breakPlan.Error"
              />,
              {
                autoDismiss: false,
                appearance: "error",
              }
            );
            setloading(false);
          }
        });
      } catch (err) {
        addToast(<FormattedMessage
          defaultMessage="Error Please Try Again."
          id="breakPlan.Error"
        />, {
          autoDismiss: false,
          appearance: "error",
        });
        setloading(false);
      }
    }
  };
  // New saggest
  const handleNewSuggest = async (e) => {
    e.preventDefault();
    if (newSuggestInput) {
      try {
        setNewSuggestInputError(false);
        setloading(true);
        await fetch(`${API_URL}/breakPlan/suggest-new-event `, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            fullName: currentUser.first_name + "" + currentUser.last_name,
            msg: newSuggestInput,
            recevier: suggestData.id,
            breakName: suggestData.breackName,
            icon: currentUser?.avatar?.key || "",
          }),
        }).then((res) => {
          if (res.status == 200) {
            addToast(
              <FormattedMessage
                defaultMessage="Your suggest sended"
                id="breakPlan.suggestSend"
              />,
              {
                autoDismiss: true,
                appearance: "success",
              }
            );
            setNewSuggestInput("");
            setShow(false);
            setClose(true);
            setloading(false);
          } else {
            addToast(
              <FormattedMessage
                defaultMessage="Error Please Try Again."
                id="breakPlan.Error"
              />,
              {
                autoDismiss: false,
                appearance: "error",
              }
            );
            setloading(false);
          }
        });
      } catch {
        addToast(
          <FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />,
          {
            autoDismiss: false,
            appearance: "error",
          }
        );
        setloading(false);
      }
    } else {
      setNewSuggestInputError(true);
    }
  };

  // Join
  const handleJoin = async (e) => {
    try {
      setloading(true);
      const data = { ...joindata, ["icon"]: currentUser?.avatar?.key || "" };
      await fetch(`${API_URL}/breakPlan/join`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status == 200) {
          addToast(
            <FormattedMessage
              defaultMessage="Request sended"
              id="breakPlan.suggestSend"
            />,
            {
              autoDismiss: true,
              appearance: "success",
            }
          );
          setShow(false);
          setClose(true);
          setloading(false);
        } else {
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />,
            {
              autoDismiss: false,
              appearance: "error",
            }
          );
          setloading(false);
        }
      });
    } catch {
      addToast(
        <FormattedMessage
          defaultMessage="Error Please Try Again."
          id="breakPlan.Error"
        />,
        {
          autoDismiss: false,
          appearance: "error",
        }
      );
      setloading(false);
    }
  };
  // Suggest new time
  const handleSuggestNewTime = async (e) => {
    e.preventDefault();
    const data = {
      ...timeData,
      ["time"]: newSuggestTime,
      ["icon"]: currentUser?.avatar?.key || "",
    };
    if (newSuggestTime) {
      setSuggestTimeError(false);
      setloading(true);
      await fetch(`${API_URL}/breakPlan/suggest-new-time `, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status == 200) {
          addToast(
            <FormattedMessage
              defaultMessage="Request sended"
              id="breakPlan.RequestSended"
            />,
            {
              autoDismiss: true,
              appearance: "success",
            }
          );
          setEmail("");
          setShow(false);
          setClose(true);
          setloading(false);
        } else {
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />,
            {
              autoDismiss: false,
              appearance: "error",
            }
          );
          setloading(false);
        }
      });
    } else {
      setSuggestTimeError(true);
    }
  };
  // Invit
  const handleInvit = async (e) => {
    e.preventDefault();
    if (checkEmail(email)) {
      setloading(true);
      const data = JSON.parse(localStorage.getItem("user"));
      await fetch(`${API_URL}/breakPlan/invite `, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          fname: data.first_name,
          lname: data.last_name,
          email: email,
          icon: data?.avatar?.key || "",
        }),
      }).then((res) => {
        if (res.status == 200) {
          addToast(
            <FormattedMessage
              defaultMessage="Sended invited request"
              id="breakPlan.SendedInvite"
            />,
            {
              autoDismiss: true,
              appearance: "success",
            }
          );
          setEmail("");
          setShow(false);
          setClose(true);
          setloading(false);
        } else {
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />,
            {
              autoDismiss: false,
              appearance: "error",
            }
          );
          setloading(false);
        }
      });
    }
  };
  // delete break plan
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await fetch(`${API_URL}/breakPlan/delete?breakPlanId=${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then((res) => {
        if (res.status === 200) {
          getBreakPlan();
          addToast(
            <FormattedMessage
              defaultMessage="Deleted Successfully."
              id="breakPlan.dellte"
            />,
            {
              autoDismiss: true,
              appearance: "success",
            }
          );
          setShow(false);
          setClose(true);
          setDeleting(false);
        } else {
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />,
            {
              autoDismiss: false,
              appearance: "error",
            }
          );
          setDeleting(false);
        }
      });
    } catch (err) {
      setDeleting(false);
    }
  };

  return (
    <div className={`${style.manCard} ${close ? style.hide : style.show}`}>
      <Card className={`${style.customCard} pb-1`}>
        <div>
          <i
            className={style.closeIcon}
            onClick={() => {
              setEditData("");
              setNewBreak({ ...newBreak, ["title"]: "", ["createIime"]: "" });
              setEmail("");
              setShow(false);
              setClose(true);
              setNewSuggestInput("");
            }}
          >
            <Icon icon="ci:close-big" />
          </i>
        </div>
        <Card.Body>
          {joinOrSagest ? (
            <>
              <Card.Title className={style.tilte}>
                <FormattedMessage
                  defaultMessage="Join Or Set new Sugest"
                  id="breakPlan.join.sagest"
                />
              </Card.Title>
              <Card.Text className="text-center pt-3">
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setNewSaggestion(false);
                    handleJoin();
                  }}
                  className={style.customBtn}
                >
                  {loading ? (
                    <Loader color="#fff" size={15} />
                  ) : (
                    <FormattedMessage defaultMessage="Join" id="btn.join" />
                  )}
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setNewSaggestion(!newSaggestion);
                  }}
                  className={style.customBtn}
                >
                  <FormattedMessage
                    defaultMessage="Suggestion"
                    id="breakPlan.suggest"
                  />
                </Button>
                {newSaggestion ? (
                  <Form className="mt-3" onSubmit={handleNewSuggest}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <FormattedMessage
                        defaultMessage="New Saggestion"
                        id="breakPlan.newSuggeation"
                      >
                        {(msg) => (
                          <Form.Control
                            autoFocus
                            required
                            value={newSuggestInput}
                            as="textarea"
                            type="email"
                            placeholder={msg}
                            className={
                              newSuggestInputError ? "red-border-input" : ""
                            }
                            onChange={(e) => setNewSuggestInput(e.target.value)}
                          />
                        )}
                      </FormattedMessage>
                    </Form.Group>
                    <Button
                      disabled={loading}
                      className={style.withBtn}
                      variant="primary"
                      type="submit"
                    >
                      {loading ? (
                        <Loader color="#fff" size={15} />
                      ) : (
                        <FormattedMessage defaultMessage="Send" id="btn.send" />
                      )}
                    </Button>
                  </Form>
                ) : (
                  ""
                )}
              </Card.Text>
            </>
          ) : newTime ? (
            <>
              <Card.Title className={style.tilte}>
                <FormattedMessage
                  defaultMessage="Suggest new time"
                  id="breakPlan.SuggestNewTime"
                />
              </Card.Title>
              <Card.Text className="text-center">
                <Form className="mt-3" onSubmit={handleSuggestNewTime}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      autoFocus
                      value={newSuggestTime}
                      className={SuggestTimeError ? "red-border-input" : ""}
                      type="time"
                      onChange={(e) => setNewSuggestTime(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className={style.withBtn}
                    variant="primary"
                    type="submit"
                  >
                    {loading ? (
                      <Loader color="#fff" size={15} />
                    ) : (
                      <FormattedMessage defaultMessage="Send" id="btn.send" />
                    )}
                  </Button>
                </Form>
              </Card.Text>
            </>
          ) : invateForm ? (
            <>
              <Card.Title className={style.tilte}>
                <FormattedMessage
                  defaultMessage="Invite to your break plan"
                  id="breakPlan.inviteToPlan"
                />
              </Card.Title>
              <Form onSubmit={handleInvit} className="mt-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FormattedMessage
                    defaultMessage="Invite Email"
                    id="breakPlan.inviteEmail"
                  >
                    {(msg) => (
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        name="email"
                        className={emailError === "" ? "" : "red-border-input"}
                        placeholder={msg}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          // checkEmail(e.target.value)
                        }}
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>

                <Button
                  disabled={loading}
                  className={style.withBtn}
                  variant="primary"
                  type="submit"
                >
                  {loading ? (
                    <Loader color="#fff" size={15} />
                  ) : (
                    <FormattedMessage defaultMessage="Invite" id="app.invite" />
                  )}
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Card.Title className={style.tilte}>
                {editData ? (
                  <>
                    <FormattedMessage
                      defaultMessage="Edit breack plan"
                      id="breakPlan.Edit"
                    />
                  </>
                ) : (
                  <FormattedMessage
                    defaultMessage="New break plan"
                    id="breakPlan.Create"
                  />
                )}
              </Card.Title>
              <Form
                onSubmit={editData ? handleEditPlan : handleCreatePlan}
                className="mt-3"
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FormattedMessage
                    defaultMessage="Plan Title"
                    id="breakPlan.planTitle"
                  >
                    {(msg) => (
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        name="title"
                        placeholder={msg}
                        value={newBreak.title}
                        onChange={(e) =>
                          setNewBreak({
                            ...newBreak,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    required
                    type="time"
                    name="createIime"
                    value={newBreak.createIime}
                    onChange={(e) =>
                      setNewBreak({
                        ...newBreak,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {editData && (
                  <Button
                    className="btn-breakPaln"
                    variant="outline-secondary"
                    onClick={() => {
                      handleDelete(editData.id);
                    }}
                  >
                    {deleting ? (
                      <Loader color="#fff" size={15} />
                    ) : (
                      <FormattedMessage
                        defaultMessage="Delete"
                        id="btn.delete"
                      />
                    )}
                  </Button>
                )}
                <Button
                  disabled={loading}
                  className={editData ? "btn-breakPaln" : style.withBtn}
                  variant="primary"
                  type="submit"
                >
                  {loading ? (
                    <Loader color="#fff" size={15} />
                  ) : editData ? (
                    <FormattedMessage defaultMessage="Edit" id="btn.edit" />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Create New Plan"
                      id="btn.CreateNewPlan"
                    />
                  )}
                </Button>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default BreackplanFrom;
