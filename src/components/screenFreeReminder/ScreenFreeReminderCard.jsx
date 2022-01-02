import { Icon } from "@iconify/react";
import { Image } from "react-bootstrap";
import React from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";

import style from "./style.module.css";

function ScreenFreeReminderCard() {
  return (
    <Card className={style.card}>
      <CardHeader
        icon={<Image src="/icone/eye 1.png" alt="eye icon" />}
        title="ScreenFree Reminder"
        action={
          <>
            <Icon icon="vaadin:plus" />
            <Icon icon="vaadin:ellipsis-dots-v" />
          </>
        }
        className="border-bottom"
      />
      <CardBody>
        <div className={style.wrapper}>
          <div className={style.header}>
            <span>
              <Icon icon="akar-icons:check-box-fill" color={`#4922ff`} />
            </span>
            <h6>5 mine screen free time</h6>
          </div>
          <p>last intermission 12:55</p>
        </div>
      </CardBody>
    </Card>
  );
}

export default ScreenFreeReminderCard;
