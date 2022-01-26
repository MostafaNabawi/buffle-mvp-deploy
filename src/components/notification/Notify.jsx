import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import moment from "moment";

function inviteNotify({ name,date, message, footer }) {
    return (
        <>
            <Row className="p-2 pb-0">
                <Col xl="2" className="pt-2">
                    <div className="breakplan-icon navy-blue text-center pt-2">
                        <Image
                            className="breakplan-img"
                            src="/icone/WB_Headshots-102-web 1.png"
                        />
                    </div>
                </Col>
                <Col xl="10">
                    <div className="break-user-name">
                        {name} <span className="float-right notifyTime">{moment(date).format('YYYY-MM-DD')}</span>
                    </div>
                    <p>{message}</p>
                </Col>
                <Col>
                    {footer}
                </Col>
                <hr />
            </Row>

        </>
    );
}
export default inviteNotify;
