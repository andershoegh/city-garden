import { IonPage as IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import React from "react";
import "./Have.css";
import Bed from "../components/Bed";

const Have: React.FC = () => {
  return (
    <IonContent>
        <IonGrid>
            <IonRow>
                <IonCol>
                    <Bed bedNr={2} style='primary'>Bed 2</Bed>
                </IonCol>
                <IonCol>                    
                    <Bed bedNr={4} style='disabled'>Bed 4</Bed>
                </IonCol>
            </IonRow>
        </IonGrid>
    </IonContent>
  );
};

export default Have;
