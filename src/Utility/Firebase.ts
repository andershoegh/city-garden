import app, { firestore } from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";

class Firebase {
  db: firebase.firestore.Firestore;
  firestore: any;

  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    this.firestore = app.firestore;
  }

  getBed = () =>
  this.db
  .collection("gardenBox");

  getTypes = () => firebase;
  getNotes = () =>
    this.db
      .collection("notes")
      .orderBy("created", "desc")
      .limit(10);
  createNote = (author: string, text: string) =>
    this.db.collection("notes").add({
      author: author,
      note: text,
      created: new Date()
    });
  getTasks = () =>
    this.db
      .collection("alltasks")
      .orderBy("gardenBoxId", "asc");
  updateTaskTaken = (id: string, taskTaken: boolean) => {
    this.db
      .collection("alltasks")
      .doc(id)
      .update({
        taskTaken: taskTaken
      });
  }
  setTaskFinished = (id: string, finished: boolean) => {
    this.db
      .collection("alltasks")
      .doc(id)
      .update({
        finished: finished
      });
  }
  getTaskDescription = () =>
    this.db
      .collection("taskTemplate");
}

export const firebase = new Firebase();
