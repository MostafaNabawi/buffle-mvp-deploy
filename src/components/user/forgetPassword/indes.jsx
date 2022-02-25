import { React, useState } from "react";
import { Row, Col, Image, Form, Button, Alert } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import style from "../style.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import { API_URL } from "../../../config";
import { checkEmail } from "../../../config/utils";
import { FormattedMessage } from "react-intl";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [submitEmail, setSubmitEmail] = useState("");
  const [errors, setErrors] = useState({
    serverError: "",
    emailError: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitEmail === "") {
      setErrors((previousState) => {
        return {
          ...previousState,
          emailError: (
            <FormattedMessage
              defaultMessage="Email is required."
              id="email.required"
            />
          ),
        };
      });
      return;
    }
    if (!checkEmail(submitEmail)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          emailError: (
            <FormattedMessage
              defaultMessage="Email is invalid."
              id="email.invalid"
            />
          ),
        };
      });
      return;
    }
    setErrors((previousState) => {
      return {
        ...previousState,
        serverError: "",
      };
    });
    setLoading(true);
    try {
      await fetch(`${API_URL}/auth/forget-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: submitEmail,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setSendEmail(true);
        } else {
          setLoading(false);
          setErrors((previousState) => {
            return {
              ...previousState,
              serverError: (
                <FormattedMessage
                  defaultMessage="User by this email not found."
                  id="acc.err"
                />
              ),
            };
          });
          return;
        }
      });
    } catch {
      setLoading(false);
      setErrors((previousState) => {
        return {
          ...previousState,
          serverError: (
            <FormattedMessage
              defaultMessage="Sorry for the server error."
              id="app.serverError"
            />
          ),
        };
      });
    }
  };
  return (
    <>
      {!sendEmail ? (
        <div className={style.loginPage}>
          <Row className="m-0 justify-content-center mt-5 pt-5">
            <Col className="col-lg-4 col-sm-6 col-xs-12">
              <div className={style.card}>
                <div className={`${style.header}  text-center pt-4`}>
                  <Image src="/favicon.ico" />
                  <div className={`${style.headerTitle} mt-3`}>
                    <FormattedMessage
                      defaultMessage="Enter your email."
                      id="app.enterEmail"
                    />
                  </div>
                </div>
                <div className={style.body}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>
                        <FormattedMessage
                          defaultMessage="Your Email"
                          id="app.login.your"
                        />
                      </Form.Label>
                      <FormattedMessage
                        defaultMessage="Enter email"
                        id="app.enterEmail"
                      >
                        {(msg) => (
                          <Form.Control
                            className={style.formInput}
                            type="text"
                            placeholder={msg}
                            name="email"
                            isInvalid={errors.emailError !== ""}
                            disabled={loading}
                            onChange={(e) => setSubmitEmail(e.target.value)}
                          />
                        )}
                      </FormattedMessage>
                      {errors.emailError !== "" && (
                        <Form.Control.Feedback type="invalid">
                          {errors.emailError}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    {errors.serverError !== "" && (
                      <Form.Group>
                        <Alert variant="danger" style={{ textAlign: "center" }}>
                          {" "}
                          {errors.serverError}{" "}
                        </Alert>
                      </Form.Group>
                    )}
                    <Button
                      className={style.submitBtn}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <PulseLoader size={10} />
                      ) : (
                        <FormattedMessage
                          defaultMessage="CHANGE PASSWORD"
                          id="pass.change"
                        />
                      )}
                    </Button>
                  </Form>
                </div>
              </div>
              <div className={style.footer}>
                <FormattedMessage
                  id="pass.remember"
                  defaultMessage="Do you remember the password ?"
                />
                <Link className={style.registerLink} to="/">
                  <FormattedMessage id="loginNow" defaultMessage="Login now" />
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Row className="p-0 m-0 mt-5 pt-5 row justify-content-center">
          <Col>
            <div className={style.iconCheck}>
              <Icon icon="emojione:white-heavy-check-mark" />
            </div>
            <h2 className="text-center mt-2">
              Email sent successfully to your email
            </h2>
            <h2 className="text-center mt-2">
              Please check your email and continue reset password from there.
            </h2>
            <h6 className="text-center mt-2">
              <b>Note:</b> You have 20 minutes to complete your reset password
            </h6>
            <h4 className="text-center mt-2">
              Click open <a href="http://gmail.com/"> Email</a>
            </h4>
          </Col>
        </Row>
      )}
    </>
  );
};
export default ForgetPassword;
