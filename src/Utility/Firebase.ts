import app, { firestore } from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";

class Firebase {
  db: firebase.firestore.Firestore;

  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    const firestore = app.firestore;
  }
  getTypes = () => firebase;
  getNotes = () =>
    this.db
      .collection("notes")
      .orderBy("created", "desc")
      .limit(10);
}

export const firebase = new Firebase();
