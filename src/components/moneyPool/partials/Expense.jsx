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
      evenId: id,
      amount: amount,
      reason: reason,
      when: when,
    };
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
            <span>paid for something.</span>
          </div>
          <div className="mb-3">
            <Form.Label>How Much? </Form.Label>
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
              Your expenses will calculate equally.
            </Form.Text>
          </div>
          <div className="mb-3">
            <Form.Group controlId="wathfor">
              <Form.Label> Wath for? </Form.Label>
              <Form.Control
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Event pass"
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Label>When? </Form.Label>
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
              Add
            </Button>
            <Button variant="secondary" onClick={handleBack}>
              Cancel
            </Button>
          </div>
        </Form>
      </Col>
      <Col lg={4}>
        <Jumbotron
          title="Some ideas"
          content={
            <>
              <p>Abbas paid for the rental car.</p>
              <p>Abbas got some supplies from the supermarket.</p>
            </>
          }
        />
      </Col>
    </Row>
  );
}

export default Expense;
