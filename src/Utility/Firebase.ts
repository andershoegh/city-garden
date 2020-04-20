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

  getTypes = () => firebase;

  getNotes = () => this.db.collection('notes').orderBy('pinned', 'desc').orderBy('created', 'desc');

  createNote = (author: string, text: string, announcement: boolean) =>
    this.db.collection('notes').add({
      author: author,
      note: text,
      created: new Date(),
      pinned: announcement,
    });

  getTasks = () => this.db.collection('alltasks').orderBy('gardenBoxId', 'asc');

  updateTaskTaken = (id: string, taskTaken: boolean) => {
    this.db.collection('alltasks').doc(id).update({
      taskTaken: taskTaken,
    });
  };

  setTaskFinished = (id: string, finished: boolean) => {
    this.db.collection('alltasks').doc(id).update({
      finished: finished,
    });
  };

  getTaskDescription = () => this.db.collection('taskTemplate');

  updatePin = (id: string) => this.db.collection('notes').doc(id);

  deleteNote = (id: string) => this.db.collection('notes').doc(id).delete();

  presentToast = async (err: string) => {
    const toast = document.createElement('ion-toast');
    toast.message = err;
    toast.duration = 5000;

    document.body.appendChild(toast);
    return toast.present();
  };
}

export const firebase = new Firebase();
