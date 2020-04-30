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
  helpName: CallableFunction;
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
    helpName,
    newTab,
  } = props;
  const taskDescription = props.taskDescription.filter(
    (t) => t.id === task.taskTemplateId
  );

  const [toggle, setToggle] = useState(false);
  const [iconToggle, setIconToggle] = useState(chevronForwardOutline);
  const [alerts, setAlerts] = useState({
    take: false,
    leave: false,
    finish: false,
    needsHelp: false,
  });

  const alertButtons = {
    cancel: {
      text: "Cancel",
      handler: () => {
        setAlerts({
          take: false,
          leave: false,
          finish: false,
          needsHelp: false,
        });
      },
    },
    takeTask: {
      text: "Assign me",
      handler: (data: any[]) => {
        const helpNeeded = data.includes("helpNeeded");
        setAlerts((prevState) => ({
          ...prevState,
          take: false,
          needsHelp: helpNeeded,
        }));
        if (!helpNeeded) {
          toggleTask(task.id, "toggleTaken", task.taskTaken, helpNeeded);
        }
      },
    },
    leaveTask: {
      text: "Unassign me",
      handler: () => {
        setAlerts((prevState) => ({ ...prevState, leave: false }));
        toggleTask(task.id, "toggleTaken", task.taskTaken, false);
      },
    },
    nameInput: {
      text: "OK",
      handler: (data: any) => {
        const helpNeeded = true;
        setAlerts((prevState) => ({ ...prevState, needsHelp: false }));
        helpName(task.id, data.needsHelp);
        toggleTask(task.id, "toggleTaken", task.taskTaken, helpNeeded);
      },
    },
    finishTask: {
      text: "Finish",
      handler: () => {
        setAlerts((prevState) => ({ ...prevState, finish: false }));
        toggleTask(task.id, "setFinished", task.taskTaken, false);
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
            label: "Check here if you'd like help",
            value: "helpNeeded",
          },
        ]}
        buttons={[alertButtons.cancel, alertButtons.takeTask]}
      />

      <IonAlert
        isOpen={alerts.needsHelp}
        header={"What's your name?"}
        message={"This will make it easier for others to find and help you"}
        inputs={[
          {
            name: "needsHelp",
            type: "text",
            id: "helpName",
          },
        ]}
        buttons={[alertButtons.cancel, alertButtons.nameInput]}
      ></IonAlert>

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
