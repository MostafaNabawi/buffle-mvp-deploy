import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from '../style.module.css'
const IndexRegister = () => {
    return (
        <div className={style.StepTowPage}>
            <Row className="p-0 m-0 row">
                <Col xl='8' className={`text-center pb-3`}>
                    <Image src='/favicon.ico'/>
                </Col>
                <Col xl='8' >
                  <h3 className={`text-center pb-2`}>Discription about Buffle registertion</h3>
                  <p className={`${style.simpleDiscription}`}>
                  Lorem Ipsum is simply dummy text of the printing 
                  and typesetting industry. Lorem Ipsum has been the industry's 
                  standard dummy text ever since the 1500s, when an unknown printer 
                  took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic
                   typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                    passages, and more recently with desktop publishing 
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </Col>
                <Col xl='8' className={`text-center pt-2`}>
                    <strong>Register as:</strong>
                    <Link className={`${style.registerBtnLink}`} to="company">Company</Link>
                    <Link className={`${style.registerBtnLink}`} to="student">Student</Link>
                    <Link className={`${style.registerBtnLink}`} to="freelancer">Freelancer</Link>
                </Col>
            </Row>
        </div>
    );
};
export default IndexRegister;