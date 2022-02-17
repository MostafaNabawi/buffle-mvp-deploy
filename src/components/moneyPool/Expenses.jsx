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
import {
  setCurrencyCode,
  setCurrencyName,
  setEventUsers,
  setOwnerID,
  setSelectedUserID,
} from "../../store/moneyPoolSlice";
import { useToasts } from "react-toast-notifications";
import { API_URL } from "../../config";
import CurrencyList from "currency-list";
import { FormattedMessage } from 'react-intl';

function Expenses() {
  const { ownerID } = useSelector((state) => state.moneyPool);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navegite = useNavigate();
  const { addToast } = useToasts();
  const [key, setKey] = useState("expense");
  const [eventName, setEventName] = useState("");
  const handleBack = () => {
    navegite(-1);
  };

  const HandlesetKey = (key) => {
    dispatch(setSelectedUserID(ownerID));
    setKey(key);
  };

  const getData = () => {
    try {
      fetch(`${API_URL}/money-poll/get-members?eventId=${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const { users, currency, owner, name } = await res.json();
          setEventName(name);
          var data = [];
          data.push({
            id: owner._id,
            first_name: owner.first_name,
            last_name: owner.last_name,
            seen: true,
          });
          users &&
            users.map((user) =>
              data.push({
                id: user.personal[0]._id,
                first_name: user.personal[0].first_name,
                last_name: user.personal[0].last_name,
                seen: user.seen,
              })
            );

          dispatch(setEventUsers(data));
          dispatch(setSelectedUserID(owner._id));
          dispatch(setOwnerID(owner._id));
          dispatch(setCurrencyName(CurrencyList.get(currency).name));
          dispatch(setCurrencyCode(currency));
        } else {
          addToast("Error Please Try Again!", {
            autoDismiss: false,
            appearance: "error",
          });
        }
      });
    } catch (err) {
      addToast("Error Please Try Again!", {
        autoDismiss: false,
        appearance: "error",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card className="event_card">
      <CardHeader title={eventName} />
      <CardBody className={style.card_body}>
        <Button onClick={handleBack}>
          <Icon icon="ic:baseline-arrow-back-ios" />
          <FormattedMessage id="btn.back" defaultMessage="Back" />
        </Button>

        <div className={style.tab_container}>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            activeKey={key}
            onSelect={(k) => HandlesetKey(k)}
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
