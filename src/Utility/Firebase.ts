import app from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './FirebaseConfig';

class Firebase {
  db: firebase.firestore.Firestore;
  firestore: any;

  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    this.firestore = app.firestore;
  }

  getBed = () => this.db.collection('gardenBox');

  updatePlant = (id:string, plant:string) => {
    this.db
    .collection('gardenBox')
    .doc(id)
    .update({plant:plant});
  };

  getTypes = () => firebase;

  getNotes = () =>
    this.db
      .collection('notes')
      .orderBy('pinned', 'desc')
      .orderBy('created', 'desc');

  createNote = (author: string, text: string) =>
    this.db.collection('notes').add({
      author: author,
      note: text,
      created: new Date(),
      pinned: false
    });

  getTasks = () => this.db.collection('alltasks').orderBy('gardenBoxId', 'asc');

  updateTaskTaken = (id: string, taskTaken: boolean) => {
    this.db
      .collection('alltasks')
      .doc(id)
      .update({
        taskTaken: taskTaken
      });
  };

  setTaskFinished = (id: string, finished: boolean) => {
    this.db
      .collection('alltasks')
      .doc(id)
      .update({
        finished: finished
      });
  };

  getTaskDescription = () => this.db.collection('taskTemplate');

  updatePin = (id: string) => this.db.collection('notes').doc(id);

  deleteNote = (id: string) =>
    this.db
      .collection('notes')
      .doc(id)
      .delete();

  getEvents = () => this.db.collection('events').orderBy('startTime', 'asc');
}

export const firebase = new Firebase();
