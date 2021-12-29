import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
const TaskManagementCard = () => {
  return (
    <section>
      <Row>
        <Col lg="7">
          <Card>
            <h1 tag="h5">Card title</h1>
            <span className="mb-2 text-muted" tag="h6">
              Card subtitle
            </span>
            <p>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </Card>
        </Col>
        <Col lg="5">
          <Card>
            <h1 tag="h5">Card title</h1>
            <span className="mb-2 text-muted" tag="h6">
              Card subtitle
            </span>
            <p>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </Card>
        </Col>
      </Row>
    </section>
  );
};
export default TaskManagementCard;
