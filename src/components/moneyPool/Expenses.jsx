import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Card from "./../card/Card";
import CardHeader from "./../card/CardHeader";
import CardBody from "./../card/CardBody";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Expense from "./partials/Expense";
import MoneyGiven from "./partials/MoneyGiven";
import InCome from "./partials/InCome";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { setSelectedUserID } from "../../store/moneyPoolSlice";

function Expenses() {
  const dispatch = useDispatch();
  const navegite = useNavigate();
  const [key, setKey] = useState("expense");
  const handleBack = () => {
    navegite(-1);
  };

  const HandlesetKey = (key) => {
    dispatch(setSelectedUserID(""));
    setKey(key);
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
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            activeKey={key}
            onSelect={(k) => HandlesetKey(k)}
            className="mb-3"
            className={style.tab}
          >
            <Tab eventKey="expense" title="Expense">
              <Expense handleBack={handleBack} />
            </Tab>
            <Tab eventKey="moneygiven" title="Money Given">
              <MoneyGiven handleBack={handleBack} />
            </Tab>
            <Tab eventKey="income" title="Income">
              <InCome handleBack={handleBack} />
            </Tab>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
}

export default Expenses;
