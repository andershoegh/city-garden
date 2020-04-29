import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonLabel,
  IonItemGroup,
  IonItemDivider,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import "./Task.css";

export interface TaskProps {
  task: firebase.firestore.DocumentData;
  taskDescription: firebase.firestore.DocumentData[];
  showTaken: boolean;
  index: number;
  isOpen: string;
  toggleOpen: CallableFunction;
  toggleTask: CallableFunction;
  newTab: boolean;
}

export const Task: React.FC<TaskProps> = (props) => {
  const {
    task,
    showTaken,
    index,
    isOpen,
    toggleOpen,
    toggleTask,
    newTab,
  } = props;
  const taskDescription = props.taskDescription.filter(
    (t) => t.id === task.taskTemplateId
  );

  const [checked, setChecked] = useState<boolean>(false);
  const [toggle, setToggle] = useState(false);
  const [iconToggle, setIconToggle] = useState(chevronForwardOutline);
  const [alerts, setAlerts] = useState({
    take: false,
    leave: false,
    finish: false,
  });

  const alertButtons = {
    cancel: {
      text: "Cancel",
      handler: () => {
        setAlerts({ take: false, leave: false, finish: false });
      },
    },
    takeTask: {
      text: "Assign me",
      handler: () => {
        setAlerts((prevState) => ({ ...prevState, take: false }));
        toggleTask(task.id, "toggleTaken", task.taskTaken, checked);
      },
    },
    leaveTask: {
      text: "Unassign me",
      handler: () => {
        setAlerts((prevState) => ({ ...prevState, leave: false }));
        toggleTask(task.id, "toggleTaken", task.taskTaken);
      },
    },
    finishTask: {
      text: "Finish",
      handler: () => {
        setAlerts((prevState) => ({ ...prevState, finish: false }));
        toggleTask(task.id, "setFinished", task.taskTaken);
      },
    },
  };

  useEffect(() => {
    if (isOpen === task.gardenBoxId) {
      setToggle(true);
      setIconToggle(chevronDownOutline);
    } else {
      setToggle(false);
      setIconToggle(chevronForwardOutline);
    }
  }, [isOpen, task.gardenBoxId]);

  const toggleInfo = () => {
    if (isOpen === task.gardenBoxId) {
      toggleOpen("0");
    } else {
      toggleOpen(task.gardenBoxId);
    }
  };

  return (
    <>
      <IonAlert
        isOpen={alerts.take}
        header={"Take Task"}
        message={
          "Do you want to assign yourself to the task of: " +
          taskDescription[0].taskTitle +
          "?"
        }
        inputs={[
          {
            name: "helpCheckbox",
            type: "checkbox",
            label: "Do you need help?",
            checked: checked,
            handler: () => {
              setChecked((prevCheck) => {
                console.log(checked, prevCheck, !prevCheck);
                return !prevCheck;
              });
              console.log(checked);
            },
          },
        ]}
        buttons={[alertButtons.cancel, alertButtons.takeTask]}
      />

      <IonAlert
        isOpen={alerts.leave}
        header={"Leave Task"}
        message={
          "Do you want to leave the task of: " +
          taskDescription[0].taskTitle +
          "?"
        }
        buttons={[alertButtons.cancel, alertButtons.leaveTask]}
      />

      <IonAlert
        isOpen={alerts.finish}
        header={"Finish Task"}
        message={
          "Did you finish the task of: " + taskDescription[0].taskTitle + "?"
        }
        buttons={[alertButtons.cancel, alertButtons.finishTask]}
      />
      <IonItemGroup className="task-group" id={task.gardenBoxId + "-tasks-id"}>
        {newTab ? (
          <IonItemDivider className="task-header" onClick={() => toggleInfo()}>
            <IonLabel>Garden box {task.gardenBoxId}</IonLabel>
            <div className="icon-box">
              <IonIcon icon={iconToggle} />
            </div>
          </IonItemDivider>
        ) : (
          <div className={toggle ? "line-divider" : "line-divider-hidden"} />
        )}
        {taskDescription.map((taskDescription) => (
          <IonItemGroup
            key={index}
            className={toggle ? "task-info" : "task-info-hidden"}
          >
            <div className="task-title">
              <div> Task </div>
              <p> {taskDescription.taskTitle} </p>
            </div>
            <div className="task-description">
              <div> Description </div>
              <p> {taskDescription.taskDescription} </p>
            </div>
            {showTaken ? (
              <div className="btn-div">
                <IonButton
                  className="task-btn"
                  color="warning"
                  onClick={() =>
                    setAlerts((prevState) => ({ ...prevState, leave: true }))
                  }
                >
                  Unassign me
                </IonButton>
                <IonButton
                  className="task-btn"
                  color="success"
                  onClick={() =>
                    setAlerts((prevState) => ({ ...prevState, finish: true }))
                  }
                >
                  Finish
                </IonButton>
              </div>
            ) : (
              <div className="btn-div">
                <IonButton
                  className="task-btn"
                  color="success"
                  onClick={() =>
                    setAlerts((prevState) => ({ ...prevState, take: true }))
                  }
                >
                  Assign me
                </IonButton>
              </div>
            )}
          </IonItemGroup>
        ))}
      </IonItemGroup>
    </>
  );
};

export default Task;
