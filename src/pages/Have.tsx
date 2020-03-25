import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import React from "react";
import "./Have.css";
import Bed from "../components/Bed";

const Have: React.FC = () => {
  return (
    <IonContent>
        <IonGrid>

            <IonRow className="bed-row">
                <IonCol size="2" size-sm>
                    <Bed bedNr={1} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={2} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={3} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={4} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={5} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={6} style='disabled'/>
                </IonCol>
            </IonRow>

            <IonRow className="bed-row">
                <IonCol size="2" size-sm>
                    <Bed bedNr={7} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={8} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={9} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={10} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={11} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={12} style='disabled'/>
                </IonCol>
            </IonRow>

            <IonRow className="bed-row">
                <IonCol size="2" size-sm>
                    <Bed bedNr={13} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={14} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={15} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={16} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={17} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={18} style='disabled'/>
                </IonCol>
            </IonRow>


            <IonRow className="bed-row">
                <IonCol size="2" size-sm offset="8">
                    <Bed bedNr={19} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={20} style='disabled'/>
                </IonCol>
            </IonRow>

            <IonRow className="bed-row">
                <IonCol size="2" size-sm offset="8">
                    <Bed bedNr={21} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={22} style='disabled'/>
                </IonCol>
            </IonRow>

            <IonRow className="bed-row">
                <IonCol size="2" size-sm>
                    <Bed bedNr={23} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={24} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={25} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={26} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={27} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={28} style='disabled'/>
                </IonCol>
            </IonRow>

            <IonRow className="bed-row">
                <IonCol size="2" size-sm>
                    <Bed bedNr={29} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={30} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={31} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={32} style='disabled'/>
                </IonCol>
                <IonCol size="2" size-sm>
                    <Bed bedNr={33} style='primary'/>
                </IonCol>
                <IonCol size="2" size-sm>                    
                    <Bed bedNr={34} style='disabled'/>
                </IonCol>
            </IonRow>

        </IonGrid>
    </IonContent>
  );
};

export default Have;
