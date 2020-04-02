import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Have.css";
import Bed from "../components/Bed";
import { firebase } from "../Utility/Firebase";

interface HaveProps{
    tasks: firebase.firestore.DocumentData[];
}

const Have: React.FC<HaveProps> = props => {
    const { tasks } = props;
    const sizeRow = "2"

    const [beds, setBeds] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    const unsub = firebase.getBed().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, {...doc.data(), id:Number(doc.id)}];
      });
      tempArray.sort((a:any, b:any) => a.id-b.id);
      console.log(tempArray);
      setBeds(tempArray)
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <IonContent>
        <IonGrid className="garden-background">
            <IonRow>
                {beds.map((bed,index)=>
                <IonCol className="bed-col" size-sm={sizeRow} key={index} offset={bed.id===19 || bed.id===21?"8":"0"}>
                    <Bed bedNr={bed.id}></Bed>
                </IonCol>)}
            </IonRow>
        </IonGrid>
    </IonContent>
  );
};

export default Have;