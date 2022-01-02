import { Icon } from "@iconify/react";
import React from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Widget from "./../common/widget/Widget";
import { Image } from "react-bootstrap";

import style from "./style.module.css";
const widgetData = [
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "Friday 03.09",
    content: "Pizza Friday",
  },
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "Tuesday 07.09",
    content: "Zoom-Cooking",
  },
];
function EventCalender() {
  return (
    <Card className={style.card}>
      <CardHeader
        icon={<Image src="/icone/exclamation-mark 4.png" alt="calender icon" />}
        title="Event Calender"
        action={
          <>
            <Icon icon="vaadin:plus" />
            <Icon icon="vaadin:ellipsis-dots-v" />
          </>
        }
      />
      <CardBody className="pt-0">
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

export default EventCalender;
