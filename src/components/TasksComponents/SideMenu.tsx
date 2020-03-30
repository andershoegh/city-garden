import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItemDivider,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { firebase } from "../../Utility/Firebase";
import "./SideMenu.css";
import Task from "./Task";

export interface SideMenuProps {
  tasks: firebase.firestore.DocumentData[];
}

export const SideMenu: React.FC<SideMenuProps> = props => {
  const { tasks } = props;
  const [taskDescriptions, setTaskDescriptions] = useState<firebase.firestore.DocumentData[]>([])
  const [showTaken, setShowTaken] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<string>("0");

  useEffect(() => {
    const unsub = firebase.getTaskDescription().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, doc.data()];
      });
      setTaskDescriptions(tempArray);
    })

    return () => {
      unsub();
    };
  }, []);

  const toggleOpen = (id: string) => {
    setIsOpen(id);
  }

  return (
    <IonCard className="card">
      <IonCardHeader>
          <IonSegment key="segment" onIonChange={e => e.detail.value === "taken" ? setShowTaken(true) : setShowTaken(false)}>
            <IonSegmentButton mode="ios" value="available">
              <IonLabel>Available</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton mode="ios" value="taken">
              <IonLabel>Taken</IonLabel>
            </IonSegmentButton>
          </IonSegment>
      </IonCardHeader>
      <IonCardContent className="list">
        <IonItemDivider sticky={true}>
          <div className="sticky-header">These garden boxes need your help!</div>
        </IonItemDivider>
        <IonList>
        { tasks.map((task, index) => (
          <Task 
            key={index} 
            task={task} 
            taskDescription={taskDescriptions} 
            showTaken={showTaken} 
            index={index}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
          />
        ))  
        }
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default SideMenu;


/*
  const toggleInfoMode = (newId : string) => {
    console.log(`newId: ${newId}`);
    console.log(`infoId: ${infoId}`);

    if (infoId === newId) {
      setInfoIsOpen(!infoIsOpen);
    } else {
      setInfoId(newId)
      setInfoIsOpen(true);
    }  
  }
  */