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
import HelpTask from "./HelpTask";

export interface SideMenuProps {
  tasks: firebase.firestore.DocumentData[];
  selection: string;
  setSelection: CallableFunction;
}

export const SideMenu: React.FC<SideMenuProps> = (props) => {
  const { tasks, selection, setSelection } = props;
  const [taskDescriptions, setTaskDescriptions] = useState<firebase.firestore.DocumentData[]>([]);
  const [showTaken, setShowTaken] = useState<boolean>(false);
  const [tabChosen, setTabChosen] = useState<string>("available");
  let priorBoxId = "0";

  useEffect(() => {
    const unsub = firebase.getTaskDescription().onSnapshot((snapShot) => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach((doc) => {
        tempArray = [...tempArray, { ...doc.data(), id: doc.id }];
      });
      setTaskDescriptions(tempArray);
    });
    
    return () => {
      unsub();
    };
  }, []);

  const toggleTab = (show: boolean) => {
    setSelection("0");
    setTabChosen(show ? "taken" : "available");
    setShowTaken(show);
  };

  const toggleOpen = (id: string) => {
    setSelection(id);
  };

  const toggleTask = (
    taskId: string,
    update: string,
    takenStatus: boolean,
    helpNeeded: boolean
  ) => {
    switch (update) {
      case "toggleTaken":
        firebase.updateTaskTaken(taskId, !takenStatus, helpNeeded);
        break;
      case "setFinished":
        firebase.setTaskFinished(taskId, true);
        break;
      default:
        break;
    }
  };

  const insertHelpName = (taskId: string, helpName: string) => {
    firebase.setHelpName(taskId, helpName);
  };

  return (
    <IonCard className="card">
      <IonCardHeader className="side-menu-header">
        <IonSegment
          className="segment"
          value={tabChosen}
          key="segment"
          onIonChange={(e) =>
            e.detail.value === "taken" ? toggleTab(true) : toggleTab(false)
          }
        >
          <IonSegmentButton mode="ios" value="available" defaultChecked>
            <IonLabel>Available</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton mode="ios" value="taken">
            <IonLabel>Taken</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonCardHeader>

      <IonCardContent className="list" id="side-menu-list">
        <IonItemDivider sticky={true}>
          <div className="sticky-header">
            {tasks.filter(
              (task) => !task.finished && task.taskTaken === showTaken
            ).length
              ? "These garden boxes need your help!"
              : "No one is working on anything"}
          </div>
        </IonItemDivider>

        {/* Help tasks */}
        <IonList>
          {tasks
            .filter((task) => task.helpNeeded)
            .map((task, index) => {
              return (
                <HelpTask
                  key={task.id}
                  helpName={task.needsHelp}
                  taskTemplateId={task.taskTemplateId}
                  gardenBoxId={task.gardenBoxId}
                ></HelpTask>
              );
            })}
        </IonList>

        <IonList>
          {tasks
            .filter((task) => !task.finished && task.taskTaken === showTaken)
            .map((task, index) => {
              let newTab = task.gardenBoxId !== priorBoxId;
              if (newTab) {
                priorBoxId = task.gardenBoxId;
              }
              return (
                <Task
                  key={task.id}
                  task={task}
                  helpName={insertHelpName}
                  taskDescription={taskDescriptions}
                  showTaken={showTaken}
                  index={index}
                  isOpen={selection}
                  toggleOpen={toggleOpen}
                  toggleTask={toggleTask}
                  newTab={newTab}
                />
              );
            })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default SideMenu;
