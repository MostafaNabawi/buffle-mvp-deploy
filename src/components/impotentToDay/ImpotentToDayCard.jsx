import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Widget from "./../common/widget/Widget";
import { Image } from "react-bootstrap";

const widgetData = [
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "09:25",
    content: "Meeting with timo about upcoming projects",
  },
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "11:25",
    content: "Work on secret project",
  },
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "14:50",
    content: "Scurm class with design team and maneger",
  },
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "15:30",
    content: "Call with jon",
  },
];
function ImpotentToDayCard() {
  return (
    <Card className="pb-0">
      <CardHeader
        icon={
          <Image
            src="/icone/exclamation-mark.png"
            alt="exclamation mark icon"
          />
        }
        title="Importent Today"
        action={
          <>
            <Link to="/dashboard/taskmanagement" className="secondary-dark-gray"><Icon icon="vaadin:plus" /></Link>
            <Icon icon="vaadin:ellipsis-dots-v" />
          </>
        }
      />
      <CardBody>
        {widgetData.map((item) => (
          <Widget
            key={item.title}
            icon={item.icon}
            title={item.title}
            content={item.content}
          />
        ))}
      </CardBody>
    </Card>
  );
}

export default ImpotentToDayCard;
