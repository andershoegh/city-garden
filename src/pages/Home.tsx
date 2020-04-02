import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Home.css";
import { firebase } from "../Utility/Firebase";
import { SideMenu } from "../components/TasksComponents/SideMenu";
import Have from "./Have"

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    const unsub = firebase.getTasks().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, doc.data()];
      });
      setTasks(tempArray)
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Have</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{height:"100%"}}>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <Have tasks={tasks}/>
            </IonCol>
            <IonCol size="4">
              <SideMenu tasks={tasks} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>  
    </IonPage>
  );
};

export default Home;