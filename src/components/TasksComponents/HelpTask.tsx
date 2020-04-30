import { IonIcon, IonCard, IonCardHeader, IonCardSubtitle } from "@ionic/react";
import React from "react";
import "./Task.css";
import { personOutline, cubeOutline, briefcaseOutline } from "ionicons/icons";

export interface HelpTaskProps {
  taskTemplateId: String;
  gardenBoxId: String;
}

const HelpTask: React.SFC<HelpTaskProps> = (props) => {
  const { taskTemplateId, gardenBoxId } = props;
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle className="subtitle ion-padding-bottom ion-text-center heading-subtitle">
          Help wanted
        </IonCardSubtitle>
        <IonCardSubtitle className="subtitle">
          <IonIcon
            icon={briefcaseOutline}
            size="large"
            className="ion-padding-end"
          ></IonIcon>
          {taskTemplateId}
        </IonCardSubtitle>
        <IonCardSubtitle className="subtitle">
          <IonIcon
            icon={personOutline}
            size="large"
            className="ion-padding-end"
          ></IonIcon>
          Person who needs help
        </IonCardSubtitle>
        <IonCardSubtitle className="subtitle">
          <IonIcon
            icon={cubeOutline}
            size="large"
            className="ion-padding-end"
          ></IonIcon>
          Garden box: {gardenBoxId}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default HelpTask;
