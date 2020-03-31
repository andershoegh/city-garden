import React, { useState } from "react";
import {
  IonPage,
  IonButton,
  IonCard,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonList,
  IonItem,
  IonTitle,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import "./Dummy.css";
import { firebase } from "../Utility/Firebase";
import "../theme/elements.scss";

export interface IDummyData {
  gardenBoxId: string;
  taskTemplateId: string;
  airMoisture: string;
  soilMoisture: string;
  soilTemperature: string;
  taskDescription: string;
  taskTitle: string;
  taskTemplateIdArray: Array<string>;
}

const Dummy: React.SFC = () => {
  const [state, setState] = useState<IDummyData>({
    gardenBoxId: "",
    taskTemplateId: "",
    airMoisture: "",
    soilMoisture: "",
    soilTemperature: "",
    taskDescription: "",
    taskTitle: "",
    taskTemplateIdArray: []
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.id]: e.detail.value! });
  };

  let db = firebase.firestore();

  const getTaskTemplates = async () => {
    const snapshot = await db.collection("taskTemplate").get();
    const documents: any = [];
    snapshot.forEach((doc: { id: string | number; data: () => any }) => {
      documents[doc.id] = doc.data();
    });
    return documents;
  };

  const addTaskTemplatesToState = async () => {
    setState((state.taskTemplateIdArray = await getTaskTemplates()));
  };

  addTaskTemplatesToState();

  const addTask = () => {
    db.collection("alltasks")
      .set({
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        finished: false,
        gardenBoxId: state.gardenBoxId,
        taskTaken: false,
        taskTemplateId: state.taskTemplateId
      })
      .then(function() {
        console.log("Document in Firebase = OK!");
      });
  };

  const updateGardenBox = () => {
    let gardenBox = db.collection("gardenBox").doc("" + state.gardenBoxId);

    if (Number(state.gardenBoxId) > 30) {
      console.log("There aren't that many garden boxes!");
      return;
    }

    return gardenBox
      .set(
        {
          airMoisture: state.airMoisture,
          soilMoisture: state.soilMoisture,
          soilTemperature: state.soilTemperature
        },
        { merge: true }
      )
      .then(function() {
        console.log("Document updated");
      })
      .catch(function(err: any) {
        console.log("Error updating: ", err);
      });
  };

  const createTaskTemplate = () => {
    let taskTemplateId = state.taskTemplateId.toString();
    console.log(taskTemplateId);
    db.collection("taskTemplate")
      .doc(taskTemplateId)
      .set({
        taskDescription: state.taskDescription,
        taskTitle: state.taskTitle
      })
      .then(function() {
        console.log("Document in Firebase = OK!");
      });
  };

  return (
    <IonPage>
      <IonRow>
        <IonCol className="ion-padding">
          <IonList class="line-input">
            <IonCard>
              <IonItem>
                <IonTitle>Add a task</IonTitle>
              </IonItem>
              <IonItem>
                <IonLabel>Garden box id - </IonLabel>
                <IonInput
                  id="gardenBoxId"
                  value={state.gardenBoxId}
                  onIonChange={handleChange}
                  class="ion-text-right ion-padding-top"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Task template id</IonLabel>
                <IonSelect
                  value={state.taskTemplateId}
                  placeholder="Select task template"
                  onIonChange={handleChange}
                >
                  {state.taskTemplateIdArray.length !== 0
                    ? state.taskTemplateIdArray.map((taskTemplate, index) => (
                        <IonSelectOption key={index}>
                          {taskTemplate}
                        </IonSelectOption>
                      ))
                    : null}
                </IonSelect>
              </IonItem>

              <IonButton className="ion-margin" onClick={addTask}>
                Add task
              </IonButton>
            </IonCard>
          </IonList>
        </IonCol>

        <IonCol className="ion-padding">
          <IonList class="line-input">
            <IonCard>
              <IonItem>
                <IonTitle>Add a new task template</IonTitle>
              </IonItem>
              <IonItem>
                <IonLabel>Task template name</IonLabel>
                <IonInput
                  id="taskTemplateId"
                  value={state.taskTemplateId}
                  onIonChange={handleChange}
                  class="ion-text-right ion-padding-top"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Task template title -</IonLabel>
                <IonInput
                  id="taskTitle"
                  value={state.taskTitle}
                  onIonChange={handleChange}
                  class="ion-text-right ion-padding-top"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Task description - </IonLabel>
                <IonInput
                  id="taskDescription"
                  value={state.taskDescription}
                  onIonChange={handleChange}
                  class="ion-text-right ion-padding-top"
                ></IonInput>
              </IonItem>

              <IonButton
                className="ion-margin"
                onClick={() => createTaskTemplate()}
              >
                Add task template
              </IonButton>
            </IonCard>
          </IonList>
        </IonCol>

        <IonCol className="ion-padding">
          <IonList className="line-input">
            <IonCard>
              <IonItem>
                <IonTitle>Set values for box</IonTitle>
              </IonItem>
              <IonItem>
                <IonLabel>Air Moisture</IonLabel>
                <IonInput
                  id="airMoisture"
                  value={state.airMoisture}
                  onIonChange={handleChange}
                  className="ion-text-right ion-padding-top"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Soil Moisture</IonLabel>
                <IonInput
                  id="soilMoisture"
                  value={state.soilMoisture}
                  onIonChange={handleChange}
                  className="ion-text-right ion-padding-top"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Soil Temperature</IonLabel>
                <IonInput
                  id="soilTemperature"
                  value={state.soilTemperature}
                  onIonChange={handleChange}
                  className="ion-text-right ion-padding-top"
                ></IonInput>
              </IonItem>
              <IonButton
                className="ion-margin"
                onClick={() => updateGardenBox()}
              >
                Update garden box values
              </IonButton>
            </IonCard>
          </IonList>
        </IonCol>
      </IonRow>
    </IonPage>
  );
};

export default Dummy;
