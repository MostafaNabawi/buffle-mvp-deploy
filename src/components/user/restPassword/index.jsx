import { React, useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link,useParams, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import style from "../style.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import { API_URL } from "../../../config";
import { useSearchParams } from "react-router-dom";
const RestPassword = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        confirmPass: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleRestPass= async (event) => {
        event.preventDefault();
        if (inputs.confirmPass === "" || inputs.password === "") {
            addToast("Password and Confirm password are required!", {
                appearance: "warning",
                autoDismiss: 4000,
            });
            return;
        }
        if (inputs.password.length < 5) {
            addToast("Password must be atlest 5 charcaters ", {
                appearance: "error",
                autoDismiss: 4000,
            });
            return;
        }
        if (inputs.password != inputs.confirmPass) {
            addToast("Confirm password not match! ", {
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
                    password :inputs.password,
                    token:token
                }),
            }).then((res) => {
                if (res.status === 200) {
                    setLoading(false)
                    addToast("password Change successfully", {
                        appearance: "success",
                        autoDismiss: 4000,
                    });
                } else {
                    addToast("error Please Try Again!", {
                        appearance: "error",
                        autoDismiss: 4000,
                    });
                    setLoading(false)
                }
            })
        } catch {
            setLoading(false);
            console.log("Server Error")
        }
    };

    useEffect(() => {

    }, []);
    console.log("token",token)
    return (
        <div className={style.loginPage}>
            <Row className="m-0 justify-content-center">
                <Col className="col-lg-4 col-sm-6 col-xs-12">
                    <div className={style.card}>
                        <div className={`${style.header}  text-center pt-4`}>
                            <Image src="/favicon.ico" />
                            <div className={`${style.headerTitle} mt-3`}>
                                Enter new password.
                            </div>
                        </div>
                        <div className={style.body}>
                            <Form onSubmit={handleRestPass}>
                                <Form.Group className="mb-5" controlId="formBasicPassword">
                                    <Form.Label className={style.lableForm}>Password</Form.Label>
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
                                    <Form.Label className={style.lableForm}>Confirm password</Form.Label>
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
                        Have you remember password ?{" "}
                        <Link className={style.registerLink} to="/">
                            Login now
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default RestPassword;
