import app from "firebase/app";
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

  presentToast = async (err: string) => {
    const toast = document.createElement('ion-toast');
    toast.message = err;
    toast.duration = 5000;

    document.body.appendChild(toast);
    return toast.present();
  };


  // BED

  getBed = () => this.db.collection('gardenBox');


  // PLANT

  getPlants = () => this.db.collection('plants');

  updatePlant = (id:string, plant:string) => {

    const dt = new Date();

    if (plant !== "empty") {
      this.db
      .collection('plants')
      .doc(plant)
      .onSnapshot(snapShot => {
        console.log(snapShot.get('weeksToHarvest'))
        dt.setDate(new Date().getDate() + (snapShot.get('weeksToHarvest') * 7));

      this.db
        .collection('gardenBox')
        .doc(id)
        .update({timeToHarvest:dt});
    })}
    else{
      this.db
      .collection('gardenBox')
      .doc(id)
      .update({timeToHarvest:null});
    }

    this.db
    .collection('gardenBox')
    .doc(id)
    .update({
      plant:plant, 
      sowTime:new Date(),
      lastFertilized: new Date(),
      lastWatered: new Date(),
      lastWeeding: new Date()
    });
  };

  // TIPS

  createPlantTip = (plant: string, tip: string) => this.db
    .collection('plants')
    .doc(plant)
    .update({
      tips: firebase.firestore.FieldValue.arrayUnion(tip)
  });

  deleteTip = (plant: string, tip: string) => this.db
    .collection('plants')
    .doc(plant)
    .update({
      tips: firebase.firestore.FieldValue.arrayRemove(tip)
  });


  // NOTES

  getNotes = () =>
    this.db
      .collection("notes")
      .orderBy("pinned", "desc")
      .orderBy("created", "desc");

  createNote = (author: string, text: string, announcement: boolean) =>
    this.db.collection("notes").add({
      author: author,
      note: text,
      created: new Date(),
      pinned: announcement,
    });

  updatePin = (id: string) => this.db.collection('notes').doc(id);

  deleteNote = (id: string) => this.db.collection('notes').doc(id).delete();


  // TASKS

  getTasks = () => this.db.collection('alltasks').orderBy('gardenBoxId', 'asc');

  updateTaskTaken = (id: string, taskTaken: boolean, helpNeeded: boolean) => {
    this.db.collection("alltasks").doc(id).update({
      taskTaken,
      helpNeeded,
    });
  };

  setTaskFinished = (id: string, finished: boolean) => {
    this.db.collection("alltasks").doc(id).update({
      finished: finished,
    });
  };
  
  getTaskDescription = () => this.db.collection("taskTemplate");

  setHelpName = (id: string, needsHelp: string) => {
    this.db.collection("alltasks").doc(id).update({
      needsHelp,
    });
  };


  // EVENTS

  getEvents = () => this.db.collection("events").orderBy("startTime", "asc");

  createEvent = (
    title: string,
    description: string,
    startTime: Date,
    endTime: Date
  ) =>
    this.db.collection("events").add({
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      attendees: [],
    });
}

export const firebase = new Firebase();
