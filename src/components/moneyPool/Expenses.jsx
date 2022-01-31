import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Card from "./../card/Card";
import CardHeader from "./../card/CardHeader";
import CardBody from "./../card/CardBody";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Expense from "./partials/Expense";
import MoneyGiven from "./partials/MoneyGiven";
import InCome from "./partials/InCome";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getEventUsers } from "../../api";
import { setEventUsers } from "../../store/moneyPoolSlice";

function Expenses() {
  const { eventUsers } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const navegite = useNavigate();
  const { id } = useParams();
  const [key, setKey] = useState("expense");

  //useEffect function
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const req = await getEventUsers(id);
    if (req !== undefined) {
      const userObj = [
        {
          _id: req.ower.id,
          first_name: req.ower.first_name,
          last_name: req.ower.last_name,
        },
      ];
      req.users.map((user) => {
        userObj.push({
          _id: user.personal[0]._id,
          first_name: user.personal[0].first_name,
          last_name: user.personal[0].last_name,
        });
      });
      console.log(userObj);
      dispatch(setEventUsers(userObj));
    }
  };

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
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            className={style.tab}
          >
            <Tab eventKey="expense" title="Expense">
              <Expense eventUsers={eventUsers} handleBack={handleBack} />
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
