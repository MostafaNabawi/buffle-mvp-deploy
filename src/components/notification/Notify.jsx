import { useContext } from "react";
import { Image, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Context } from "../../layout/Wrapper";
import TimeAgo from "react-timeago";
import germanStrings from "react-timeago/lib/language-strings/de";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import RenderImage from "../cutomeImage/RenderImage";

function InviteNotify({ type, name, date, message, footer, icon }) {
  const context = useContext(Context);
  const currennt = context.getCurrent();
  const formatter = buildFormatter(germanStrings);
  const formatMsg = () => {
    if (!message || !type) {
      return "";
    }
    if (message.includes("water")) {
      return <FormattedMessage defaultMessage={message} id="notify.water" />;
    }
    if (message.includes("finished")) {
      return (
        <FormattedMessage
          defaultMessage={message}
          id="notify.task"
          values={{
            name: message.split(" ")[0],
          }}
        />
      );
    }
    if (message.includes("accepted your invitation")) {
      return (
        <FormattedMessage
          defaultMessage={message}
          id="notify.acceptInvite"
          values={{
            name: message.split(" ")[0],
          }}
        />
      );
    }
    if (message.includes("joined to Lunchplan")) {
      return (
        <FormattedMessage
          defaultMessage={message}
          id="notify.joined"
          values={{
            name: message.split("(")[1],
          }}
        />
      );
    }

    if (message.includes("accept your time suggestion for Lunchplan")) {
      return (
        <FormattedMessage
          defaultMessage={message}
          id="notify.acceptBreakSuggest"
          values={{
            name: message.split("break plan")[1],
          }}
        />
      );
    }

    if (message.includes("has new suggestion")) {
      return (
        <FormattedMessage
          defaultMessage={message}
          id="notify.newSuggest"
          values={{
            msg: message.split("(")[1],
          }}
        />
      );
    }
    if (message.includes("money poll")) {
      return (
        <FormattedMessage
          defaultMessage={message}
          id="notify.money"
          values={{
            name: message.split("(")[1],
          }}
        />
      );
    }
    // break plans
    if (type === "invite") {
      return <FormattedMessage defaultMessage={message} id="notify.invite" />;
    }
    if (type === "new-time") {
      const splitMsg = message.split("Lunchplan")[1].split("at");
      return (
        <FormattedMessage
          defaultMessage={message}
          id="notify.suggestNewTime"
          values={{
            name: splitMsg[0],
            time: splitMsg[1],
          }}
        />
      );
    }
    // console.log("Type | msg", type, " ", message);
  };

  return (
    <>
      <Row className="p-2 pb-0">
        <Col xl="2" className="pt-0 pb-3">
          <div className="breakplan-icon navy-blue text-center">
            {icon && icon === "task" && (
              <Image
                className="breakplan-img mt-1"
                src="/icone/task manager 1.png"
              />
            )}
            {icon && icon === "water" && (
              <Image className="breakplan-img2" src="/icone/Vector.png" />
            )}
            {icon != "water" && icon != "task" && <RenderImage code={icon} />}
          </div>
        </Col>
        <Col xl="10">
          <div className="break-user-name">
            {name}{" "}
            <span className="float-right notifyTime">
              {currennt === 0 ? (
                <TimeAgo date={date} />
              ) : (
                <TimeAgo date={date} formatter={formatter} />
              )}
            </span>
          </div>
          <p>{formatMsg()}</p>
        </Col>
        <Col>{footer}</Col>
        <hr />
      </Row>
    </>
  );
}
export default InviteNotify;
