import { Fragment, useEffect, useState, useMemo, useContext } from "react";
import { Col, Card, ListGroup, Button, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { API_URL } from "../../config/index";
import { checkEmail } from "../../config/utils";
import PulseLoader from "react-spinners/PulseLoader";
import { useToasts } from "react-toast-notifications";
import CurrencyList from "currency-list";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage } from "react-intl";
import { Context } from "../../layout/Wrapper";

const Setting = () => {
  const { addToast } = useToasts();
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [loadingRege, setLoadingReg] = useState(false);
  const [copyValue, setCopyValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [currencyData, setCurrencyData] = useState(null);
  const [defaultPrefrence, setDefaultPrefrence] = useState(null);
  const space = localStorage.getItem("space");

  useEffect(() => {
    setCurrencyData(Object.values(CurrencyList.getAll("en_US")));
    async function getSettings() {
      const req = await fetch(`${API_URL}/user/settings`, {
        credentials: "include",
      });
      const res = await req.json();
      if (res?.data) {
        setDefaultPrefrence({
          lang: res?.data?.language,
          currency: res?.data?.currency,
        });
      } else {
        setDefaultPrefrence({
          lang: "en",
          currency: "USD",
        });
      }
    }
    getSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      addToast(
        <FormattedMessage
          id="email.required"
          defaultMessage="Email is required.  👀"
        />,
        {
          appearance: "warning",
          autoDismiss: 4000,
        }
      );
      return;
    }
    if (!checkEmail(email)) {
      addToast(
        <FormattedMessage
          id="email.invalid"
          defaultMessage="Email is invalid"
        />,
        {
          appearance: "warning",
          autoDismiss: 4000,
        }
      );
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
          addToast(
            <FormattedMessage
              id="setting.invite"
              defaultMessage="Invitation email send."
            />,
            {
              appearance: "success",
              autoDismiss: 4000,
            }
          );
          setEmail("");
        } else {
          addToast(
            <FormattedMessage
              id="emailNotFound"
              defaultMessage="Can't find this email. Please try another one."
            />,
            {
              appearance: "error",
              autoDismiss: 4000,
            }
          );
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
          addToast(
            <FormattedMessage
              defaultMessage="Error Please Try Again."
              id="breakPlan.Error"
            />,
            {
              appearance: "error",
              autoDismiss: 4000,
            }
          );
          setLoadingReg(false);
        }
      });
    } catch {
      setLoadingReg(false);
    }
  };
  const handlePrefrence = async (e) => {
    e.preventDefault();
    setLoadingTwo(true);
    fetch(`${API_URL}/user/settings`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: defaultPrefrence.lang,
        currency: defaultPrefrence.currency,
      }),
    }).then((res) => {
      if (res.status === 200) {
        context.selectLanguage(defaultPrefrence?.lang);
        localStorage.setItem(
          "prefrence",
          JSON.stringify({
            language: defaultPrefrence?.lang,
            currency: defaultPrefrence?.currency,
          })
        );
        addToast(
          <FormattedMessage
            defaultMessage="Settings updated."
            id="pref.update"
          />,
          {
            autoDismiss: 6000,
            appearance: "success",
          }
        );
        setLoadingTwo(false);
      } else {
        addToast(
          <FormattedMessage
            defaultMessage="Server Error."
            id="app.serverError"
          />,
          {
            autoDismiss: 6000,
            appearance: "error",
          }
        );
        setLoadingTwo(false);
      }
    });
  };
  const dynamic = useMemo(() => {
    if (defaultPrefrence) {
      return (
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item className="pb-3">
              <h4>
                <FormattedMessage defaultMessage="Settings" id="settings" />
              </h4>
            </ListGroup.Item>
            <Form onSubmit={handlePrefrence}>
              <Row>
                <Col xl={6}>
                  <Form.Group className="mt-3">
                    <Form.Label>
                      <FormattedMessage
                        defaultMessage="Language"
                        id="app.header.language"
                      />
                    </Form.Label>
                    <Form.Select
                      className={style.hide}
                      name="lang"
                      disabled={loadingTwo}
                      defaultValue={defaultPrefrence.lang}
                      onChange={(e) => {
                        setDefaultPrefrence((prev) => {
                          return { ...prev, lang: e.target.value };
                        });
                      }}
                    >
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xl={6} className="mt-3">
                  <Form.Label>
                    <FormattedMessage
                      defaultMessage="Currency"
                      id="app.header.currency"
                    />
                  </Form.Label>
                  <Form.Select
                    className={style.hide}
                    name="image"
                    disabled={loadingTwo}
                    defaultValue={defaultPrefrence.currency}
                    onChange={(e) => {
                      setDefaultPrefrence((prev) => {
                        return { ...prev, currency: e.target.value };
                      });
                    }}
                  >
                    {currencyData &&
                      currencyData.map((currency, i) => (
                        <Fragment key={`${i}-currency`}>
                          <option value={currency?.code}>
                            {currency?.name} ({currency?.code})
                          </option>
                        </Fragment>
                      ))}
                  </Form.Select>
                </Col>
              </Row>
              <Button
                disabled={loadingTwo}
                className="mt-2"
                variant="primary"
                type="submit"
              >
                {loadingTwo ? (
                  <PulseLoader size={10} />
                ) : (
                  <FormattedMessage defaultMessage="Save" id="btn.save" />
                )}
              </Button>
            </Form>
          </ListGroup>
        </Card>
      );
    }
  }, [defaultPrefrence]);
  return (
    <Col xl="8" className="pt-5">
      {space === "c" || space === "a" ? (
        <>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="pb-3">
                <h4>
                  <FormattedMessage
                    id="inviteLink"
                    defaultMessage="Invite Link"
                  />
                </h4>
                {copyValue ? (
                  <i>{copyValue}</i>
                ) : (
                  <p className="mt-2">
                    <FormattedMessage
                      id="generateLink"
                      defaultMessage="Click to regeneration button for generate invite link"
                    />
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
                  <Button
                    disabled={copyValue ? false : true}
                    className={style.btn}
                  >
                    <Icon icon="akar-icons:copy" />
                    {copied ? (
                      <FormattedMessage id="Copied" defaultMessage="Copied" />
                    ) : (
                      <FormattedMessage
                        id="copy.clip"
                        defaultMessage="Copy to clipboard"
                      />
                    )}
                  </Button>
                </CopyToClipboard>
                <Button
                  disabled={loadingRege}
                  onClick={() => {
                    handleRegeneration();
                  }}
                  className={`${style.btn} btn-primary`}
                >
                  {loadingRege ? <PulseLoader size={10} /> : " Regeneration"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="pb-3">
                <h4>
                  <FormattedMessage
                    id="breakPlan.inviteEmail"
                    defaultMessage="Invite Email"
                  />
                </h4>
              </ListGroup.Item>
              <ListGroup.Item className="pb-3">
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="input-group mb-3 mt-3"
                    controlId="formBasicEmail"
                  >
                    <FormattedMessage id="label.email" defaultMessage="Email">
                      {(msg) => (
                        <Form.Control
                          disabled={loading}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          type="email"
                          placeholder={msg}
                        />
                      )}
                    </FormattedMessage>
                    <Button disabled={loading} variant="primary" type="submit">
                      {loading ? (
                        <PulseLoader size={10} />
                      ) : (
                        <FormattedMessage id="btn.send" defaultMessage="Send" />
                      )}
                    </Button>
                  </Form.Group>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </>
      ) : null}

      {dynamic}
    </Col>
  );
};

export default Setting;
