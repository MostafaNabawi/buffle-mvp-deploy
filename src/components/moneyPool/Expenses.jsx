import React, { useState } from "react";
import style from "./style.module.css";
import Card from "./../card/Card";
import CardHeader from "./../card/CardHeader";
import CardBody from "./../card/CardBody";
import { Button, Tab, Tabs, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Expense from "./partials/Expense";
import MoneyGiven from "./partials/MoneyGiven";
import InCome from "./partials/InCome";
import { Icon } from "@iconify/react";

const data = [
  { name: "Hassan", icon: <Icon icon="akar-icons:check" color={`#20ca7d`} /> },
  { name: "Ali", icon: <Icon icon="bi:x-lg" color={`#4922ff`} /> },
];

function Expenses() {
  const navegite = useNavigate();
  const [key, setKey] = useState("expense");

  const handleBack = () => {
    navegite(-1);
  };

  return (
        <Card className="event_card">
      <CardHeader title="BD" />
    <CardBody className={style.card_body}>
      <div>
        <Button onClick={handleBack}>
          <Icon icon="ic:baseline-arrow-back-ios" />
          Back
        </Button>
      </div>
      <div className={style.tab_container}>
        <Form>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            className={style.tab}
          >
            <Tab eventKey="expense" title="Expense">
              <Expense data={data} />
            </Tab>
            <Tab eventKey="moneygiven" title="Money Given">
              <MoneyGiven data={data} />
            </Tab>
            <Tab eventKey="income" title="Income">
              <InCome data={data} />
            </Tab>
          </Tabs>
          <div>
            <Button className="me-2" onClick={handleBack}>
              Add
            </Button>
            <Button variant="secondary" onClick={handleBack}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </CardBody>
    </Card>
  );
}

export default Expenses;
