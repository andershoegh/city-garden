import React, { useState } from "react";
import { 
  IonButton, 
  IonLabel, 
  IonItemGroup, 
  IonItemDivider 
} from "@ionic/react";
import { firebase } from "../../Utility/Firebase";
import "./Task.css"

export interface TaskProps {
  task: firebase.firestore.DocumentData;
  taskDescription: firebase.firestore.DocumentData[];
  showTaken: boolean;
  index: number;
}

export const Task: React.FC<TaskProps> = props => {
  let task: firebase.firestore.DocumentData;
  task = props.task;
  const taskDescription = props.taskDescription.filter(e => e.taskTemplateId === task.taskTemplateId);
  const showTaken = props.showTaken;
  const index = props.index;
  
  const [toggle, setToggle] = useState("task-info-hidden");
  const [isHidden, setIsHidden] = useState(true);
  const [isTaken, setIsTaken] = useState<boolean>(task.taskTaken);
  const [isFinished, setIsFinished] = useState<boolean>(task.finished);

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
    if (isHidden) {
      setToggle("task-info");
      setIsHidden(false);
    } else {
      setToggle("task-info-hidden");
      setIsHidden(true)
    }
  }

  return  (
    <IonItemGroup className="task-group">
      <IonItemDivider className="task-header" onClick={() => toggleInfo()}>
        <IonLabel>Garden box {task.gardenBoxId}</IonLabel>
      </IonItemDivider>
      {taskDescription.map(desc => (
        <IonItemGroup key={index} className={toggle}>
          <div className="task-title">
            <strong>Task</strong> 
            <br/> {desc.taskTitle}
          </div>
          <div className="task-description">
            <strong>Description</strong> 
            <br/> {desc.taskDescription}
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