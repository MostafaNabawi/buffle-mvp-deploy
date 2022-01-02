import { Icon } from "@iconify/react";
import React from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import WaterRepository from "./WaterRepository";
import { Image } from "react-bootstrap";

function HydrationReminderCard() {
  return (
    <Card>
      <CardHeader
        icon={<Image src="/icone/Vector.png" alt="water drop icon" />}
        title="Hydration Reminder"
        action={
          <>
            <Icon icon="vaadin:plus" />
            <Icon icon="vaadin:ellipsis-dots-v" />
          </>
        }
      />
      <CardBody>
        <WaterRepository />
      </CardBody>
    </Card>
  );
}

export default HydrationReminderCard;
