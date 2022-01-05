import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link} from "react-router-dom";
import style from '../style.module.css'
const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [sendEmail, setSendEmail] = useState(false)
  const handleRegister=()=>{
        setSendEmail(true)
  }
  return (
    <div className={style.registerPage}>
      {
        !sendEmail
          ? <Row className="p-0 m-0 row justify-content-center">
            <Col xl='4'>
              <div className={style.registerImg}>
                <Image src='/img/register.png' />
              </div>
            </Col>
            <Col xl='4'>
              <div className={style.registerCard}>
                <div className={`${style.header}  text-center pt-4`}>
                  <div className={style.floatLeft}>1/2</div>
                  <Image src="/favicon.ico" />
                  <div className={`${style.headerTitle} mt-3`}>
                    Enter your info
                  </div>
                </div>
                <div className={style.body}>
                  <Form>
                    <Row>
                      <Col xl='6'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className={style.lableForm}>First Name</Form.Label>
                          <Form.Control
                            className={style.formInput}
                            type="text"
                            placeholder="First Name"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl='6'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className={style.lableForm}>last Name</Form.Label>
                          <Form.Control
                            className={style.formInput}
                            type="text"
                            placeholder="Last name"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>E-mail</Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>Company Name</Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder="Company Name"
                      />
                    </Form.Group>

                    <Row>
                      <Col xl='6'>
                        <Form.Group className="mb-3">
                          <Form.Label className={style.lableForm}>Company Size</Form.Label>
                          <Form.Control
                            className={style.formInput}
                            type="number"
                            placeholder="Compan Size"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl='6'>
                        <Form.Group className="mb-3">
                          <Form.Label className={style.lableForm}>Text ID</Form.Label>
                          <Form.Control
                            className={style.formInput}
                            type="number"
                            placeholder="Text ID"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>Web Site</Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder="Web Site"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className={style.lableForm}>Head Office</Form.Label>
                      <Form.Control
                        className={style.formInput}
                        type="text"
                        placeholder="Head Office"
                      />
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className={style.lableForm}>Password</Form.Label>
                  <div className="mb-3 input-group">
                    <Form.Control
                      className={style.formInput}
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Password"
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
                </Form.Group> */}

                    <Button 
                    className={style.submitBtn} 
                    type="button"
                    onClick={(e)=>{handleRegister(e)}}
                    >
                      REGISTER
                    </Button>
                    {/* <button className={`${style.btnGoogle} mt-4`} type="submit">
                  <Icon className="google-icon" icon="flat-color-icons:google" />
                  Register with Google
                </button> */}
                  </Form>
                </div>
              </div>
              <div className={style.footer}>
                Do have account yet?{" "}
                <Link className={style.registerLink} to="/login">
                  Login now
                </Link>
              </div>
            </Col>
          </Row>
          : <Row className="p-0 m-0 row justify-content-center">
              <Col>
                 <div className={style.iconCheck}>
                 <Icon icon="emojione:white-heavy-check-mark" />
                 </div>
                 <h2 className="text-center mt-2">
                 Message sent successfully to your email
                 </h2>
                 <h2 className="text-center mt-2">
                 Please check your email and
                 continue registering from here.
                 </h2>
                 <h4 className="text-center mt-2">
                  Cleck open <a href="http://gmail.com/"> Email</a>
                 </h4>
              </Col>
          </Row>
      }
    </div>
  );
};
export default UserRegister;