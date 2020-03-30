import { IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./Home.css";
import { firebase } from "../Utility/Firebase";
import { SideMenu } from "../components/TasksComponents/SideMenu";

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
      <SideMenu tasks={tasks} /> 
    </IonPage>
  );
};

export default Home;
