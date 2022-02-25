import { React, useState } from "react";
import { Col, Card, ListGroup, Button, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { API_URL } from "../../config/index";
import { checkEmail } from "../../config/utils";
import PulseLoader from "react-spinners/PulseLoader";
import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage } from 'react-intl';

const Setting = () => {
  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRege, setLoadingReg] = useState(false);
  const [copyValue, setCopyValue] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      addToast(<FormattedMessage id="email.required" defaultMessage="Email is required.  👀" />, {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    if (!checkEmail(email)) {
      addToast(<FormattedMessage id="email.invalid" defaultMessage="Email is invalid" />, {
        appearance: "warning",
        autoDismiss: 4000,
      });
      return;
    }
    try {
      setLoading(true);
      await fetch(`${API_URL}/invite/invite-by-email`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: email,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          addToast(<FormattedMessage id="setting.invite" defaultMessage="Invitation email send." />, {
            appearance: "success",
            autoDismiss: 4000,
          });
          setEmail("");
        } else {
          addToast("This email was not register in buffle. please try again.", {
            appearance: "error",
            autoDismiss: 4000,
          });
          setLoading(false);
        }
      });
    } catch {
      setLoading(false);
    }
  };
  const handleRegeneration = async () => {
    setCopyValue("");
    try {
      setLoadingReg(true);
      await fetch(`${API_URL}/user/my-invite`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const { link } = await res.json();
          setLoadingReg(false);
          setCopyValue(link);
        } else {
          addToast(<FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />, {
            appearance: "error",
            autoDismiss: 4000,
          });
          setLoadingReg(false);
        }
      });
    } catch {
      setLoadingReg(false);
    }
  };
  return (
    <Col xl="8" className="pt-5">
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="pb-3">
            <h4>Invite Link</h4>
            {copyValue ? (
              <i>{copyValue}</i>
            ) : (
              <p className="mt-2">
                Click to regeneration button for generate invite link
              </p>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <CopyToClipboard
              text={copyValue}
              onCopy={() => {
                setCopied(true);
              }}
            >
              <Button disabled={copyValue ? false : true} className={style.btn}>
                <Icon icon="akar-icons:copy" />
                {copied ? ` Copied` : "Copy to clipboard"}
              </Button>
            </CopyToClipboard>
            <Button
              disabled={loadingRege}
              onClick={() => {
                handleRegeneration();
              }}
              className={style.btn}
            >
              {loadingRege ? <PulseLoader size={10} /> : " Regeneration"}
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="pb-3">
            <h4><FormattedMessage id="breakPlan.inviteEmail" defaultMessage="Invite Email" /></h4>
          </ListGroup.Item>
          <ListGroup.Item className="pb-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="input-group mb-3 mt-3"
                controlId="formBasicEmail"
              >
                <Form.Control
                  disabled={loading}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Enter email"
                />
                <Button disabled={loading} variant="primary" type="submit">
                  {loading ? <PulseLoader size={10} /> : "Send"}
                </Button>
              </Form.Group>
            </Form>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default Setting;
