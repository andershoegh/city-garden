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
        tempArray = [...tempArray, {...doc.data(), id: doc.id}];
      });
      setTaskDescriptions(tempArray);
    })

    return () => {
      unsub();
    };
  }, []);

  const toggleTab = (show: boolean) => {
    setShowTaken(show);
    setIsOpen("0");
  }

  const toggleOpen = (id: string) => {
    setIsOpen(id);
  }

  return (
    <IonCard className="card">
      <IonCardHeader>
          <IonSegment key="segment" onIonChange={e => e.detail.value === "taken" ? toggleTab(true) : toggleTab(false)}>
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
            {tasks.filter(task => !task.finished && task.taskTaken === showTaken).map((task, index) => {           
              return <Task 
                key={index} 
                task={task} 
                taskDescription={taskDescriptions}
                showTaken={showTaken}
                index={index} 
                isOpen={isOpen}
                toggleOpen={toggleOpen}
              />
            })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default SideMenu;