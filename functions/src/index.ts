import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();

//firestore trigger to delete tasks
exports.deleteTasks = functions.firestore
  .document('/alltasks/{userId}')
  .onUpdate((snap: any, context: any) => {
    const data = snap.after.data();
    const id = snap.after.id;

    if (data.finished) {
      return admin.firestore().collection('alltasks').doc(id).delete();
    } else {
      return null;
    }
  });

const db = admin.firestore();
const tasks = db.collection('alltasks');


  exports.updateWateringTask = functions.firestore
  .document('/gardenBox/{boxId}')
  .onUpdate((snap:any, context:any) => {
    const dataBefore = snap.before.data();
    const dataAfter = snap.after.data();
    const boxId = snap.after.id;
    const currentDate = new Date().getDate();
    const lastWaterDate = new Date(dataBefore.lastWatered.toDate()).getDate();
    const box = tasks.where('gardenBoxId','==',boxId);
    const waterTask = box.where('taskTemplateId','==','watering');
    
    if (dataAfter.soilMoisture < 80 && currentDate !== lastWaterDate){
      waterTask.get().then((snapshot:any) => {
        if(snapshot.empty){ 
          return tasks.add({
            created: new Date(),
            finished: false,
            gardenBoxId: boxId,
            taskTaken: false,
            taskTemplateId: "watering"});
        }else{
          console.log("There is already a task");
        }        
      })
      return 0;
    }else{
      return null;
    }
  });