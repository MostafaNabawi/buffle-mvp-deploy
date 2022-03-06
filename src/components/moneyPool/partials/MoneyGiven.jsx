import React, { useState } from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Jumbotron from "./Jumbotron";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { createMoneyGiven } from "../../../api";
import { FormattedMessage } from 'react-intl';
function MoneyGiven(props) {
  const { handleBack, currency } = props;
  const { eventUsers, selectedUserID, currencyName, currencyCode } =
    useSelector((state) => state.moneyPool);
  const { id } = useParams();
  const [whoId, setWhoId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [when, setWhen] = useState("");
  const { addToast } = useToasts();
  const hadleAddMoneyGiven = async () => {
    const data = {
      userId: selectedUserID,
      eventId: id,
      amount: amount,
      reason: reason,
      whoId: whoId,
      when: when,
    };

    const req = await createMoneyGiven(data);
    if (req.status === 200) {
      addToast(
        <FormattedMessage
          id="task.success"
          defaultMessage="Created successfully"
        />, {
        autoDismiss: true,
        appearance: "success",
      });
      setAmount("");
      setReason("");
      setWhoId("");
      setWhen("");
    }
  };

  return (
    <Row>
      <Col lg={8}>
        <Form>
          <div className={`${style.person_seletor} mb-5`}>
            <PersonSelectorDropDown />
            <span><FormattedMessage id="event.giveMoneyToSom" defaultMessage="gave money to someone." /></span>
          </div>
          <div className="mb-3">
            <Form.Label><FormattedMessage id="event.howMuch" defaultMessage="How Much?" /> </Form.Label>
            <InputGroup className="mb-1">
              <InputGroup.Text id="basic-addon1">
                {currencyCode}
              </InputGroup.Text>
              <FormControl
                placeholder={`Amount in ${currencyName}`}
                aria-label="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              <FormattedMessage id="event.yourExpenseC" defaultMessage="Your expenses will calculate equally." />
            </Form.Text>
          </div>
          <div className="mb-3">
            <Form.Label> <FormattedMessage id="event.toWho" defaultMessage="To Who?" /></Form.Label>
            {eventUsers &&
              eventUsers.map(
                (user) =>
                  user.id !== selectedUserID && (
                    <Form.Check
                      type="radio"
                      name="whoId"
                      value={whoId}
                      key={user.id}
                      label={`${user.first_name} ${user.last_name}`}
                      onChange={(e) => setWhoId(user.id)}
                      id="default radio"
                    />
                  )
              )}
          </div>
          <div className="mb-3">
            <Form.Group controlId="wathfor">
              <Form.Label><FormattedMessage id="event.whatFor" defaultMessage="Wath for?" /> </Form.Label>

              <FormattedMessage id="event.eventPass" defaultMessage="Event pass" >
                {(msg) => (
                  <Form.Control
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={msg}
                  />
                )}
              </FormattedMessage>
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Label><FormattedMessage id="event.when" defaultMessage="When?" /> </Form.Label>
            <InputGroup className="mb-1">
              <FormControl
                aria-label="when"
                aria-describedby="basic-addon1"
                type="date"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
              <InputGroup.Text id="basic-addon1">MM/DD/YYYY</InputGroup.Text>
            </InputGroup>
          </div>
          <div>
            <Button className="me-2" onClick={hadleAddMoneyGiven}>
              <FormattedMessage id="btn.add" defaultMessage="Add" />
            </Button>
            <Button variant="secondary" onClick={handleBack}>
              <FormattedMessage id="btn.cancel" defaultMessage="Cancel" />
            </Button>
          </div>
        </Form>
      </Col>
      <Col lg={4}>
        <Jumbotron
          title={<FormattedMessage id="event.idea" defaultMessage="Some ideas" />}
          content={
            <>
              <p><FormattedMessage id="event.ideaText3" defaultMessage="Luca withdrew money from the ATM for Aylin." /></p>
              <p><FormattedMessage id="event.ideaText4" defaultMessage="Achim paid lunch for Malina." /></p>
            </>
          }
        />
      </Col>
    </Row>
  );
}

export default MoneyGiven;
