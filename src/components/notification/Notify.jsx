import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import TimeAgo from "react-timeago";
import RenderImage from "../cutomeImage/RenderImage";

function inviteNotify({ name, date, message, footer,icon }) {
  return (
    <>
      <Row className="p-2 pb-0">
        <Col xl="2" className="pt-0 pb-3">
          <div className="breakplan-icon navy-blue text-center">
            {icon && icon==="task" &&(
              <Image
              className="breakplan-img mb-2"
              src="/icone/task manager 1.png"
            />
            )}
             {icon && icon==="water" &&(
              <Image
              className="breakplan-img mb-2"
              src="/icone/Vector.png"
            />
            )}
            {
              icon !="water" && icon !="task" &&(
                <RenderImage code={icon}/>
              ) 
            }
          </div>
        </Col>
        <Col xl="10">
          <div className="break-user-name">
            {name}{" "}
            <span className="float-right notifyTime">
              <TimeAgo date={date} />
            </span>
          </div>
          <p>{message}</p>
        </Col>
        <Col>{footer}</Col>
        <hr />
      </Row>
    </>
  );
}
export default inviteNotify;
