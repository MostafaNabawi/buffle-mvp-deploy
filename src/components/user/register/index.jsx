import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from '../style.module.css'
const IndexRegister = () => {
    return (
        <div className={style.StepTowPage}>
            <Row className="p-0 m-0 row">
                <Col xl='8'>
                    <Link to="company">Company</Link><br/>
                    <Link to="student">Student</Link><br/>
                    <Link to="freelancer">Freelancer</Link><br/>
                </Col>
            </Row>
        </div>
    );
};
export default IndexRegister;