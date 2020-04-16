import React, { useState, useEffect } from "react";
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
  gardenBoxArray: firebase.firestore.DocumentData[];
  taskTemplateId: string;
  airMoisture: string;
  soilMoisture: string;
  soilTemperature: string;
  taskDescription: string;
  taskTitle: string;
  chosenTaskTemplate: string;
  lastWeeding: string;
}

export interface ITemplateArray {
  taskTemplateArray: Array<string>;
}

const Dummy: React.SFC = () => {
  const [state, setState] = useState<IDummyData>({
    gardenBoxId: "",
    gardenBoxArray: [],
    taskTemplateId: "",
    airMoisture: "",
    soilMoisture: "",
    soilTemperature: "",
    taskDescription: "",
    taskTitle: "",
    chosenTaskTemplate: "",
    lastWeeding: ""
  });

  const [taskTemplateArray, setTaskTemplateArray] = useState<
    firebase.firestore.DocumentData[]
  >([]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.id]: e.detail.value! });
  };

  useEffect(() => {
    const unsub = firebase.db
      .collection("taskTemplate")
      .onSnapshot(snapshot => {
        let documents: any = [];
        snapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setTaskTemplateArray(documents);
      });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = firebase.db.collection("gardenBox").onSnapshot(snapshot => {
      let documents: any = [];
      snapshot.forEach(doc => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      documents.sort(
        (
          a: firebase.firestore.DocumentData,
          b: firebase.firestore.DocumentData
        ) => {
          return Number(a.id) - Number(b.id);
        }
      );
      setState(s => {
        return { ...s, gardenBoxArray: documents };
      });
    });
    return () => {
      unsub();
    };
  }, []);

  const addTask = () => {
    firebase.db
      .collection("alltasks")
      .doc()
      .set({
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        finished: false,
        gardenBoxId: state.gardenBoxId,
        taskTaken: false,
        taskTemplateId: state.chosenTaskTemplate
      })
      .then(function() {
        console.log("Document in Firebase = OK!");
      });
  };

  const updateGardenBox = () => {
    let gardenBox = firebase.db.collection("gardenBox").doc(state.gardenBoxId);

    if (Number(state.gardenBoxId) > 35) {
      console.log("There aren't that many garden boxes!");
      return;
    }

    return gardenBox
      .set(
        {
          airMoisture: state.airMoisture,
          soilMoisture: state.soilMoisture,
          soilTemperature: state.soilTemperature,
          lastWeeding:state.lastWeeding
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
    firebase.db
      .collection("taskTemplate")
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
                <IonLabel>Garden box id -</IonLabel>
                <IonSelect
                  id="gardenBoxId"
                  value={state.gardenBoxId}
                  placeholder="Select garden box id"
                  onIonChange={handleChange}
                >
                  {state.gardenBoxArray.map((gardenBox, index) => (
                    <IonSelectOption key={index}>
                      {gardenBox.id}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Task template id</IonLabel>
                <IonSelect
                  id="chosenTaskTemplate"
                  value={state.chosenTaskTemplate}
                  placeholder="Select task template"
                  onIonChange={handleChange}
                >
                  {taskTemplateArray.map((taskTemplate, index) => (
                    <IonSelectOption key={index}>
                      {taskTemplate.id}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonButton
                expand="block"
                className="ion-margin"
                onClick={addTask}
              >
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
                expand="block"
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
                <IonLabel>Garden box id -</IonLabel>
                <IonSelect
                  id="gardenBoxId"
                  value={state.gardenBoxId}
                  placeholder="Select garden box id"
                  onIonChange={handleChange}
                >
                  {state.gardenBoxArray.map((gardenBox, index) => (
                    <IonSelectOption key={index}>
                      {gardenBox.id}
                    </IonSelectOption>
                  ))}
                </IonSelect>
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
              <IonItem>
                <IonLabel>Last weeding</IonLabel>
                <IonInput
                  id="lastWeeding"
                  type="date"
                  value={state.lastWeeding}
                  onIonChange={handleChange}
                  className="ion-text-right ion-padding-top"/>
              </IonItem>
              <IonButton
                expand="block"
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
