import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import style from "../style.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import { API_URL } from "../../../config";
import { checkEmail } from "../../../config/utils";

const ForgetPassword = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [submitEmail, setSubmitEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitEmail === "") {
      addToast("Email are required!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    if (!checkEmail(submitEmail)) {
      addToast("Please inter valid Email!", {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
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
          addToast("Invalid Email!", {
            appearance: "error",
            autoDismiss: 4000,
          });
          setLoading(false);
        }
      });
    } catch {
      setLoading(false);
      console.log("Server Error");
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
                    Enter your email.
                  </div>
                </div>
                <div className={style.body}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>
                        Your Email
                      </Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        disabled={loading}
                        onChange={(e) => setSubmitEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      className={style.submitBtn}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <PulseLoader size={10} /> : "CHANGE PASSWORD"}
                    </Button>
                  </Form>
                </div>
              </div>
              <div className={style.footer}>
                Have you remember password ?{" "}
                <Link className={style.registerLink} to="/">
                  Login now
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
              Message sent successfully to your email
            </h2>
            <h2 className="text-center mt-2">
              Please check your email and continue rest password from here.
            </h2>
            <h6 className="text-center mt-2">
              <b>Note:</b> You have 20 minutes to complete your reset password!
            </h6>
            <h4 className="text-center mt-2">
              Cleck open <a href="http://gmail.com/"> Email</a>
            </h4>
          </Col>
        </Row>
      )}
    </>
  );
};
export default ForgetPassword;
