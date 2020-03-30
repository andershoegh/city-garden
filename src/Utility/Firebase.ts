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

  getTypes = () => firebase;
  getNotes = () => this.db.collection("notes").orderBy("created", "desc");
  createNote = (author: string, text: string) =>
    this.db.collection("notes").add({
      author: author,
      note: text,
      created: new Date()
    });
}

export const firebase = new Firebase();
