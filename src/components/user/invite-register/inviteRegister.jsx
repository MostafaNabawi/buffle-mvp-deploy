import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import style from "../style.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import { API_URL } from "../../../config";
import { checkEmail } from "../../../config/utils";
import { FormattedMessage } from "react-intl";

const InviteRegister = () => {
  const { addToast } = useToasts();
  const { campanyName, companyId } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    space_id: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = { ...inputs, ["wid"]: companyId };
    if (
      inputs.email === "" ||
      inputs.password === "" ||
      inputs.first_name === "" ||
      inputs.last_name === ""
    ) {
      addToast(<FormattedMessage id="requiredAll" defaultMessage="All field is reqrequired." />, {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    if (!checkEmail(inputs.email)) {
      addToast(
        <FormattedMessage id="email.invalid" defaultMessage="Invalid email" />
        , {
          appearance: "warning",
          autoDismiss: 4000,
        });
      return;
    }
    if (inputs.password < 5) {
      addToast(<FormattedMessage id="pass.validate" defaultMessage="Password must be at least more than 5 character" />, {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    setLoading(true);
    try {
      await fetch(`${API_URL}/auth/signup/invited`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("pp", inputs.password);
          navigate(`/?new=true&email=${inputs.email}`);
        } else {
          addToast(<FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />, {
            appearance: "error",
            autoDismiss: 4000,
          });
          setLoading(false);
        }
      });
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className={style.loginPage}>
      <Row className="m-0 justify-content-center">
        <Col className="col-lg-4 col-sm-6 col-xs-12">
          <div className={style.card}>
            <div className={`${style.header}  text-center pt-4`}>
              <Image src="/favicon.ico" />
              <div className={`${style.headerTitle} mt-3`}>
                <FormattedMessage id="registerIn" defaultMessage="Register in" /> <i>{campanyName} </i><FormattedMessage id="company" defaultMessage="company" />
              </div>
            </div>
            <div className={style.body}>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className={style.lableForm}>
                    <FormattedMessage id="user.fname" defaultMessage="First Name" />
                  </Form.Label>
                  <FormattedMessage id="user.fname" defaultMessage="First Name">
                    {(msg) => (
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder={msg}
                        name="first_name"
                        disabled={loading}
                        onChange={(e) =>
                          setInputs({ ...inputs, [e.target.name]: e.target.value })
                        }
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className={style.lableForm}> <FormattedMessage id="user.lname" defaultMessage="Last Name" /></Form.Label>
                  <FormattedMessage id="user.lname" defaultMessage="Last Name">
                    {(msg) => (
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder={msg}
                        name="last_name"
                        disabled={loading}
                        onChange={(e) =>
                          setInputs({ ...inputs, [e.target.name]: e.target.value })
                        }
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className={style.lableForm}>
                    <FormattedMessage id="label.email" defaultMessage="Email" />
                  </Form.Label>
                  <FormattedMessage id="label.email" defaultMessage="Email" >
                    {(msg) => (
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder={msg}
                        name="email"
                        disabled={loading}
                        onChange={(e) =>
                          setInputs({ ...inputs, [e.target.name]: e.target.value })
                        }
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Label className={style.lableForm}><FormattedMessage id="label.password" defaultMessage="Password" /></Form.Label>
                  <div className="mb-4 input-group">
                    <FormattedMessage
                      id="label.password" defaultMessage="Password"
                    >
                      {(msg) => (
                        <Form.Control
                          className={style.formInput}
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder={msg}
                          name="password"
                          disabled={loading}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      )}
                    </FormattedMessage>
                    <i
                      onClick={() => setShowPassword(!showPassword)}
                      className={`${style.formInput} ${style.passwordIcon} input-group-text`}
                      id="btnGroupAddon"
                    >
                      {!showPassword ? (
                        <Icon icon="akar-icons:eye" />
                      ) : (
                        <Icon icon="clarity:eye-hide-line" />
                      )}
                    </i>
                  </div>
                </Form.Group>
                <Button
                  className={style.submitBtn}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <PulseLoader size={10} /> : <FormattedMessage id="btn.register" defaultMessage="REGISTER" />}
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default InviteRegister;
