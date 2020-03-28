import React, { useState } from "react";
import { IonPage, IonButton } from "@ionic/react";
import { firebase } from "../Utility/Firebase";

export interface IDummyData {
  created: string;
  finished: boolean;
  gardenBoxId: number;
  taskTaken: boolean;
  taskTemplateId: string;
}

const Dummy: React.SFC = () => {
  //const [DummyData, setDummyData] = useState<IDummyData>();

  let taskData = {
    created: firebase.firestore.Timestamp.fromDate(new Date()),
    finished: false,
    gardenBoxId: 2,
    taskTaken: false,
    taskTemplateId: 1
  };

  let taskTemplateData = {
    taskDescription: "Dummy task description",
    taskTitle: "Dummy title"
  };

  let db = firebase.firestore();

  function addTask() {
    db.collection("alltasks")
      .add(taskData)
      .then(function() {
        console.log("Document in Firebase = OK!");
      });
  }

  function updateGardenBox(gardenBoxId: any) {
    let gardenBox = db.collection("gardenBox").doc("" + gardenBoxId);

    if (gardenBoxId > 30) {
      console.log("There aren't that many garden boxes!");
      return;
    }

    return gardenBox
      .set(
        {
          airMoisture: 10,
          soilMoisture: 10,
          soilTemperature: 10
        },
        { merge: true }
      )
      .then(function() {
        console.log("Document updated");
      })
      .catch(function(err: any) {
        console.log("Error updating: ", err);
      });
  }

  function createTaskTemplate(taskTemplateId: any) {
    db.collection("taskTemplate")
      .doc(taskTemplateId)
      .set(taskTemplateData)
      .then(function() {
        console.log("Document in Firebase = OK!");
      });
  }

  return (
    <IonPage>
      <IonButton onClick={addTask}>Add task to DB</IonButton>
      <IonButton onClick={() => createTaskTemplate("Harvest")}>
        Add task template to DB
      </IonButton>
      <IonButton onClick={() => updateGardenBox(20)}>
        Update garden box values
      </IonButton>
    </IonPage>
  );
};

export default Dummy;
