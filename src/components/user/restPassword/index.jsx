import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import style from "../style.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import { API_URL } from "../../../config";
import { FormattedMessage } from 'react-intl';
const RestPassword = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        confirmPass: "",
        password: "",
    });
    const handleRestPass = async (event) => {
        event.preventDefault();
        if (inputs.confirmPass === "" || inputs.password === "") {
            addToast(<FormattedMessage id="passwords.req" defaultMessage="Password and Confirm password are required." />, {
                appearance: "warning",
                autoDismiss: 4000,
            });
            return;
        }
        if (inputs.password.length < 5) {
            addToast(<FormattedMessage id="pass.validate" defaultMessage="Password must be atlest more than 5 charcaters " />, {
                appearance: "error",
                autoDismiss: 4000,
            });
            return;
        }
        if (inputs.password != inputs.confirmPass) {
            addToast(<FormattedMessage id="pass.notMatch" defaultMessage="Passwords are not matching" />, {
                appearance: "error",
                autoDismiss: 4000,
            });
            return;
        }
        setLoading(true);
        try {
            await fetch(`${API_URL}/auth/reset-password`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({
                    password: inputs.password,
                    token: token
                }),
            }).then(async (res) => {
                if (res.status === 200) {
                    const { payload } = await res.json()
                    localStorage.setItem("pp", inputs.password);
                    navigate(`/?new=true&email=${payload.value.email}`);
                } else {
                    addToast(<FormattedMessage
                        defaultMessage="Error Please Try Again."
                        id="breakPlan.Error"
                    />, {
                        appearance: "error",
                        autoDismiss: 4000,
                    });
                    setLoading(false)
                    navigate("/forget-password")

                }
            })
        } catch {
            setLoading(false);
            console.log("Server Error")
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
                                <FormattedMessage id="app.enterPassNew" defaultMessage="Enter new password." />
                            </div>
                        </div>
                        <div className={style.body}>
                            <Form onSubmit={handleRestPass}>
                                <Form.Group className="mb-5" controlId="formBasicPassword">
                                    <Form.Label className={style.lableForm}><FormattedMessage id="app.password" defaultMessage="Password" /></Form.Label>
                                    <div className="mb-4 input-group">
                                        <Form.Control
                                            className={style.formInput}
                                            type={`${showPassword ? "text" : "password"}`}
                                            placeholder="Password"
                                            name="password"
                                            disabled={loading}
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                        />
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
                                <Form.Group className="mb-5" controlId="formBasicPassword">
                                    <Form.Label className={style.lableForm}><FormattedMessage id="confirmPass" defaultMessage="Confirm password" /></Form.Label>
                                    <div className="mb-4 input-group">
                                        <Form.Control
                                            className={style.formInput}
                                            type={`${showPassword ? "text" : "password"}`}
                                            placeholder="Password"
                                            name="confirmPass"
                                            disabled={loading}
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                        />
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
                                    {loading ? <PulseLoader size={10} /> : "SAVE"}
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <FormattedMessage id="password.remember" defaultMessage="Do you remember password?" />{" "}
                        <Link className={style.registerLink} to="/">
                            <FormattedMessage id="loginNow" defaultMessage="Login now" />
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default RestPassword;
