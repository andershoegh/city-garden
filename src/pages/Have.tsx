import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Have.css";
import Bed from "../components/Bed";
import { firebase } from "../Utility/Firebase";

interface HaveProps{
    tasks: firebase.firestore.DocumentData[];
    setSelection:CallableFunction;
}

const Have: React.FC<HaveProps> = props => {
    const { tasks, setSelection } = props;
    const sizeRow = "2"

    const [beds, setBeds] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    const unsub = firebase.getBed().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, {...doc.data(), id:doc.id}];
      });
      tempArray.sort((a:any, b:any) => Number(a.id)-Number(b.id));
      console.log(tempArray);
      setBeds(tempArray)
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    // <IonContent className="garden-background">
    //     <IonGrid >
            <IonRow>
                {beds.map((bed,index)=>
                <IonCol size-sm={sizeRow} key={index} offset={bed.id==="19" || bed.id==="21"?"8":"0"}>
                    <Bed bedNr={bed.id} setSelection={setSelection}></Bed>
                </IonCol>)}
            </IonRow>
    //     </IonGrid>
    // </IonContent>
  );
};

export default Have;