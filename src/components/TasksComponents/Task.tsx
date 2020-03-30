import React, { useState, useEffect } from "react";
import { 
  IonButton, 
  IonLabel, 
  IonItemGroup, 
  IonItemDivider,
  IonIcon
} from "@ionic/react";
import { firebase } from "../../Utility/Firebase";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import "./Task.css"

export interface TaskProps {
  task: firebase.firestore.DocumentData;
  taskDescription: firebase.firestore.DocumentData[];
  showTaken: boolean;
  index: number;
  isOpen: string;
  toggleOpen: CallableFunction;
}

export const Task: React.FC<TaskProps> = props => {
  const { showTaken, index, isOpen, task, toggleOpen } = props;
  const taskDescription = props.taskDescription.filter(e => e.taskTemplateId === task.taskTemplateId);

  const [toggle, setToggle] = useState("task-info-hidden");
  const [isTaken, setIsTaken] = useState<boolean>(task.taskTaken);
  const [isFinished, setIsFinished] = useState<boolean>(task.finished);
  const [iconToggle, setIconToggle] = useState(chevronForwardOutline);

  useEffect(() => {
    if (isOpen === task.gardenBoxId) {
      setToggle("task-info");
      setIconToggle(chevronDownOutline);
    } else {
      setToggle("task-info-hidden");
      setIconToggle(chevronForwardOutline);
    }
  }, [isOpen, task.gardenBoxId])

  if (showTaken !== task.taskTaken || task.finished) {
    return null;
  }

  const toggleTask = (update : string) => {
    switch (update) {
      case "toggleTaken" :
        let tempTaken = !isTaken;       
        firebase.updateTaskTaken(task.gardenBoxId, tempTaken);
        setIsTaken(tempTaken);
        break;
      case "setFinished" :
        let tempFinished = !isFinished;
        firebase.setTaskFinished(task.gardenBoxId, tempFinished);
        setIsFinished(tempFinished);
        break;
      default:
        break;
    }
  }

  const toggleInfo = () => {
    if (isOpen === task.gardenBoxId) {
      toggleOpen("0");
    } else {
      toggleOpen(task.gardenBoxId);
    }
  }

  return  (
    <IonItemGroup className="task-group">
      <IonItemDivider className="task-header" onClick={() => toggleInfo()}>
        <IonLabel>Garden box {task.gardenBoxId}</IonLabel>
        <div className="icon-box">
          <IonIcon icon={iconToggle} />
        </div>
      </IonItemDivider>
      { taskDescription.map(taskDescription => (
        <IonItemGroup key={index} className={toggle}>
          <div className="task-title">
            <strong>Task</strong> 
            <br/> {taskDescription.taskTitle}
          </div>
          <div className="task-description">
            <strong>Description</strong> 
            <br/> {taskDescription.taskDescription}
          </div>
          { showTaken ?
            <div className="btn-div">
              <IonButton 
                className="task-btn" 
                onClick={() => toggleTask("toggleTaken")}>
                  leave task
              </IonButton>
              <IonButton
                className="task-btn"
                onClick={() => toggleTask("setFinished")}>
                finish task
              </IonButton>
            </div>
          :
            <IonButton 
              className="task-btn"
              onClick={() => toggleTask("toggleTaken")}>
                take task
            </IonButton>
          }
        </IonItemGroup>
      ))}
    </IonItemGroup>
  );
};

export default Task;



/*  const toggleInfo = () => {
    props.toggleInfoMode(task.gardenBoxId);

    console.log(`gardenBoxId: ${task.gardenBoxId}`);
    console.log(`infoId: ${infoId}`);
    console.log(`infoIsOpen: ${infoIsOpen}`);

    if (task.gardenBoxId === infoId) {
      infoIsOpen ? setToggle("task-info") : setToggle("task-info-hidden");
    } else {
      setToggle("task-info-hidden");
    }
  }
*/