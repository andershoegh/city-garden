import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();

//firestore trigger to delete tasks
exports.deleteTasks = functions.firestore
  .document('/alltasks/{userId}')
  .onUpdate((snap: any, context: any) => {
    const data = snap.after.data();
    const id = snap.after.id;
    switch(data.taskTemplateId){
      case 'watering':
        gardenBox.doc(data.gardenBoxId).update({lastWatered:new Date()});
        break;
      
      case 'fertilizing':
        gardenBox.doc(data.gardenBoxId).update({lastFertilized:new Date()});
        break;

      default:
        console.log("Task update not implemented yet");
        break;
    }
    if (data.finished) {
      return admin.firestore().collection('alltasks').doc(id).delete();
    } else {
      return null;
    }
  });

const db = admin.firestore();
const tasks = db.collection('alltasks');
const gardenBox = db.collection('gardenBox');

exports.updateWateringTask = functions.firestore
.document('/gardenBox/{boxId}')
.onUpdate((snap:any, context:any) => {
  const dataAfter = snap.after.data();
  const boxId = snap.after.id;
  const currentDate = new Date().getDate();
  const lastWaterDate = new Date(dataAfter.lastWatered.toDate()).getDate();
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
    waterTask.get().then((snapshot:any) => {
      if(snapshot.empty){
        return null;
      }else if(snapshot.docs[0].data().taskTaken === false){
        console.log("Delete Task: "+snapshot.docs[0].id);
        return tasks.doc(snapshot.docs[0].id).delete();
      }
    });
    return 0;
  }
});

exports.updateFertilizerTask = functions.firestore
.document('/gardenBox/{boxId}')
.onUpdate((snap:any, context:any) => {
  const dataAfter = snap.after.data();
  const boxId = snap.after.id;
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const lastFertilizedMonth = new Date(dataAfter.lastFertilized.toDate()).getMonth();
  const lastFertilizedDay = new Date(dataAfter.lastFertilized.toDate()).getDate();
  const box = tasks.where('gardenBoxId','==',boxId);
  const fertilizerTask = box.where('taskTemplateId','==','fertilizing');

  if(currentMonth !== lastFertilizedMonth && currentDay >= lastFertilizedDay){
    fertilizerTask.get().then((snapshot:any) => {
      if(snapshot.empty){
        console.log('Add fertilizer task to bed: '+boxId);
        return tasks.add({
          created: new Date(),
          finished: false,
          gardenBoxId: boxId,
          taskTaken: false,
          taskTemplateId: 'fertilizing'
        });
        return 0;
      }else{
        return null;
      }
    })
  }else{
    return null;
  }
  return 0;
})

exports.updateSowTask = functions.firestore
.document('/gardenBox/{boxId}')
.onUpdate((snap:any, context:any) => {
  const dataAfter = snap.after.data();
  const boxId = snap.after.id;

  if(dataAfter.plant === 'empty'){
    return tasks.add({
      created: new Date(),
      finished: false,
      gardenBoxId: boxId,
      taskTaken: false,
      taskTemplateId: 'sowing'
    });
  }
  return 0;
})