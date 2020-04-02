import React, { useState, useEffect } from "react";
import { 
  IonButton, 
  IonLabel, 
  IonItemGroup, 
  IonItemDivider,
  IonIcon,
} from "@ionic/react";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import "./Task.css"

export interface TaskProps {
  task: firebase.firestore.DocumentData;
  taskDescription: firebase.firestore.DocumentData[];
  showTaken: boolean;
  index: number;
  isOpen: string;
  toggleOpen: CallableFunction;
  toggleTask: CallableFunction
  newTab: boolean;
}

export const Task: React.FC<TaskProps> = props => {
  const { task, showTaken, index, isOpen, toggleOpen, toggleTask, newTab } = props;
  const taskDescription = props.taskDescription.filter(t => t.id === task.taskTemplateId);
  const [toggle, setToggle] = useState(false);
  const [iconToggle, setIconToggle] = useState(chevronForwardOutline);

  useEffect(() => {
    if (isOpen === task.gardenBoxId) {
      setToggle(true);
      setIconToggle(chevronDownOutline);
    } else {
      setToggle(false);
      setIconToggle(chevronForwardOutline);
    }
  }, [isOpen, task.gardenBoxId])

  const toggleInfo = () => {
    if (isOpen === task.gardenBoxId) {
      toggleOpen("0");
    } else {
      toggleOpen(task.gardenBoxId);
    }
  }

  return  (
    <IonItemGroup className="task-group">
      { newTab ?
        <IonItemDivider className="task-header" onClick={() => toggleInfo()}>
        <IonLabel>Garden box {task.gardenBoxId}</IonLabel>
        <div className="icon-box">
          <IonIcon icon={iconToggle} />
        </div>
      </IonItemDivider>
      : <div className={toggle ? "line-divider" : "line-divider-hidden"} />
      }
      { taskDescription.map(taskDescription => (
        <IonItemGroup key={index} className={toggle ? "task-info" : "task-info-hidden"}>
          <div className="task-title">
            <div> Task </div> 
            <p> {taskDescription.taskTitle} </p>
          </div>
          <div className="task-description">
            <div> Description </div> 
            <p> {taskDescription.taskDescription} </p>
          </div>
          { showTaken ?
            <div className="btn-div">
              <IonButton 
                className="task-btn" 
                color="warning"
                onClick={() => toggleTask(task.id, "toggleTaken", task.taskTaken)}>
                  leave task
              </IonButton>
              <IonButton
                className="task-btn"
                color="success"
                onClick={() => toggleTask(task.id, "setFinished", task.taskTaken)}>
                finish task
              </IonButton>
            </div>
          :
            <div className="btn-div">
              <IonButton 
              className="task-btn"
              color="success"
              onClick={() => toggleTask(task.id, "toggleTaken", task.taskTaken)}>
                take task
            </IonButton>
            </div>
          }
        </IonItemGroup>
      ))}
    </IonItemGroup>
  );
};

export default Task;