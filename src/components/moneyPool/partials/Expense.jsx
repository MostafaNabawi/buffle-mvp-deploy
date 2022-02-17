import React, { useState } from "react";
import PersonSelectorDropDown from "./PersonSelectorDropDown";
import style from "./../style.module.css";
import { useToasts } from "react-toast-notifications";
import Jumbotron from "./Jumbotron";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createExpense } from "../../../api";
import { FormattedMessage } from 'react-intl';

function Expense(props) {
  const { handleBack } = props;
  const { selectedUserID, currencyName, currencyCode } = useSelector(
    (state) => state.moneyPool
  );
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [when, setWhen] = useState("");
  const { addToast } = useToasts();
  const hadleAddExpense = async () => {
    const data = {
      userId: selectedUserID,
      eventId: id,
      amount: amount,
      reason: reason,
      when: when,
    };
    console.log("dd", data);
    const req = await createExpense(data);
    if (req.status === 200) {
      addToast("Created Susseccfully", {
        autoDismiss: true,
        appearance: "success",
      });
      setAmount("");
      setReason("");
      setWhen("");
    }
  };

  return (
    <Row>
      <Col lg={8}>
        <Form>
          <div className={`${style.person_seletor} mb-5`}>
            <PersonSelectorDropDown />
            <span><FormattedMessage id="event.paidFor" defaultMessage="paid for something." /></span>
          </div>
          <div className="mb-3">
            <Form.Label><FormattedMessage id="event.howMuch" defaultMessage="How Much?" /> </Form.Label>
            <InputGroup className="mb-1">
              <InputGroup.Text id="basic-addon1">
                {currencyCode}
              </InputGroup.Text>
              <FormattedMessage id="event.amountIn" values={{
                currencyName: currencyName
              }} defaultMessage={`Amount in ${currencyName}`} >
                {(msg) => (
                  <FormControl
                    placeholder={msg}
                    aria-label="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-describedby="basic-addon1"
                  />
                )}
              </FormattedMessage>
            </InputGroup>
            <Form.Text className="text-muted">
              <FormattedMessage id="event.yourExpenseC" defaultMessage="Your expenses will calculate equally." />
            </Form.Text>
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
            <Button className="me-2" onClick={hadleAddExpense}>
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
              <p><FormattedMessage id="event.ideaText" defaultMessage="Abbas paid for the rental car." /></p>
              <p><FormattedMessage id="event.ideaText2" defaultMessage="Abbas got some supplies from the supermarket." /></p>
            </>
          }
        />
      </Col>
    </Row>
  );
}

export default Expense;
