import { React, useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import style from "../style.module.css";
import { signin, userStatus } from "../../../api";
import PulseLoader from "react-spinners/PulseLoader";
import { API_URL } from "../../../config";
import { checkEmail } from "../../../config/utils";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
const InviteRegister = () => {
    const { addToast } = useToasts();
    const {campanyName,companyId}=useParams()
    console.log("campany",campanyName,companyId)
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        firstname: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    // const { ok } = useParams();
    const mutulLogin = async (email, pass) => {
        setLoading(true);
        const req = await signin({ email: email, password: pass });
        if (req.status === 400) {
            setLoading(false);
            addToast("Email or Password  is invalid!", {
                appearance: "error",
                autoDismiss: 4000,
            });
            return;
        }
        if (req.status === 200) {
            if (req.data.type === 0) {
                addToast(req.data.msg, {
                    appearance: "warning",
                    autoDismiss: 8000,
                });
                setLoading(false);
            }
            if (req.data.type === 1) {
                console.log(req.data);
                localStorage.setItem("user", JSON.stringify(req.data.user));
                localStorage.setItem("space", JSON.stringify(req?.data?.stype));
                localStorage.removeItem("pp");
                navigate("/dashboard");
            }
            if (req.data.type === 2) {
                localStorage.setItem("user", JSON.stringify(req.data.user));
                localStorage.setItem("space", JSON.stringify(req?.data?.stype));
                localStorage.removeItem("pp");
                navigate("/dashboard");
            }
        }
    };
    const handleLogin = async (event) => {
        event.preventDefault();
        if (inputs.email === "" || inputs.password === ""
            || inputs.firstname === "" || inputs.lastName === ""
        ) {
            addToast("All field is reqrequir 👀 ", {
                appearance: "warning",
                autoDismiss: 4000,
            });
            return;
        }
        if (!checkEmail(inputs.email)) {
            addToast("Invalid Email!", {
                appearance: "warning",
                autoDismiss: 4000,
            });
            return;
        }
        if(inputs.password < 5){
            addToast("Password must be at least more than 5 character", {
                appearance: "warning",
                autoDismiss: 4000,
            });
            return;
        }
        setLoading(true);
        // try{
        //     await fetch(`${API_URL}/auth/forget-password`,{
        //         method: "POST",
        //         credentials: "include",
        //         headers: {
        //           "Content-Type": "application/json",
        //           "Access-Control-Allow-Credentials": true,
        //         },
        //         body: JSON.stringify({
        //           email: submitEmail,
        //         }),
        //     }).then((res)=>{
        //         if(res.status === 200){
        //             setLoading(false)
        //             setSendEmail(true)
        //         }else{
        //             addToast("Invalid Email!", {
        //                 appearance: "error",
        //                 autoDismiss: 4000,
        //             });
        //             setLoading(false)
        //         }
        //     })
        // }catch{
        //     setLoading(false);
        //     console.log("Server Error")
        // }
        // register
    };
    useEffect(() => {
        let mount = true;
        async function getStatus() {
            const req = await userStatus();
            if (req.status === 200) {
                navigate("/dashboard");
            } else {
                localStorage.removeItem("user");
            }
        }
        if (mount) {
            const user_storage = JSON.parse(localStorage.getItem("user"));
            if (user_storage) {
                getStatus();
            }
        }
        if (searchParams.get("new") === "true") {
            console.log("login", searchParams.get("email"));
            mutulLogin(searchParams.get("email"), localStorage.getItem("pp"));
        }
        if (searchParams.get("company") === "true") {
            addToast(
                "Your company registered when your company approved by Buffle we will send you email!",
                {
                    appearance: "success",
                }
            );
        }

        return () => {
            mount = false;
        };
    }, []);
    return (
        <div className={style.loginPage}>
            <Row className="m-0 justify-content-center">
                <Col className="col-lg-4 col-sm-6 col-xs-12">
                    <div className={style.card}>
                        <div className={`${style.header}  text-center pt-4`}>
                            <Image src="/favicon.ico" />
                            <div className={`${style.headerTitle} mt-3`}>
                            Register in <i>{campanyName} </i>campany
                            </div>
                        </div>
                        <div className={style.body}>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label className={style.lableForm}>
                                        First Name
                                    </Form.Label>
                                    <Form.Control
                                        className={style.formInput}
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        disabled={loading}
                                        onChange={(e) =>
                                            setInputs({ ...inputs, [e.target.name]: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label className={style.lableForm}>
                                        Last Name
                                    </Form.Label>
                                    <Form.Control
                                        className={style.formInput}
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        disabled={loading}
                                        onChange={(e) =>
                                            setInputs({ ...inputs, [e.target.name]: e.target.value })
                                        }
                                    />
                                </Form.Group>
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
                                        onChange={(e) =>
                                            setInputs({ ...inputs, [e.target.name]: e.target.value })
                                        }
                                    />
                                </Form.Group>
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
                                <Button
                                    className={style.submitBtn}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? <PulseLoader size={10} /> : "REGISTER"}
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
