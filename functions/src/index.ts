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

      case 'weeding':
        gardenBox.doc(data.gardenBoxId).update({lastWeeding: new Date()});
        break;

      case 'harvesting':
        gardenBox.doc(data.gardenBoxId).update({plant:'empty', timeToHarvest: null});
        break;
      
      default:
        console.log("Task update not implemented yet or just deleting");
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
  
  if (dataAfter.soilMoisture < 80 && currentDate !== lastWaterDate && dataAfter.plant !== 'empty'){
    waterTask.get().then((snapshot:any) => {
      if(snapshot.empty){ 
        console.log("Adding watering task to box: "+boxId)
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
  const currentDate = new Date().getDate();
  const lastFertilizedMonth = new Date(dataAfter.lastFertilized.toDate()).getMonth();
  const lastFertilizedDate = new Date(dataAfter.lastFertilized.toDate()).getDate();
  const box = tasks.where('gardenBoxId','==',boxId);
  const fertilizerTask = box.where('taskTemplateId','==','fertilizing');

  if(currentMonth !== lastFertilizedMonth && currentDate >= lastFertilizedDate && dataAfter.plant !== 'empty'){
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
      }
    })
  }
  return 0;
})

exports.updateWeedingTask = functions.firestore
.document('/gardenBox/{boxId}')
.onUpdate((snap:any, context:any) => {
  const dataAfter = snap.after.data();
  const boxId = snap.after.id;
  const lastWeedingDate = new Date(dataAfter.lastWeeding.toDate()).getDate();
  const currentDate = new Date().getDate();
  const lastWeedingDay = new Date(dataAfter.lastWeeding.toDate()).getDay();
  const currentDay = new Date().getDay();
  const box = tasks.where('gardenBoxId','==',boxId);
  const weedingTask = box.where('taskTemplateId','==','weeding');

  if(lastWeedingDate !== currentDate && currentDay === lastWeedingDay && dataAfter.plant !== 'empty'){
    weedingTask.get().then((snapshot:any) => {
      if(snapshot.empty){
        console.log("Adding weeding task to box: "+boxId);
        return tasks.add({
          created: new Date(),
          finished: false,
          gardenBoxId: boxId,
          taskTaken: false,
          taskTemplateId: 'weeding'
        });
      }
    })
  }
  return 0;
})

exports.updateSowTask = functions.firestore
.document('/gardenBox/{boxId}')
.onUpdate((snap:any, context:any) => {
  const dataAfter = snap.after.data();
  const boxId = snap.after.id;
  const box = tasks.where('gardenBoxId','==',boxId);
  const sowingTask = box.where('taskTemplateId','==','sowing');

  if(dataAfter.plant === 'empty'){
    sowingTask.get().then((snapshot:any) =>{
      if(snapshot.empty){
        console.log("Adding sowing task to box: "+boxId);
        return tasks.add({
          created: new Date(),
          finished: false,
          gardenBoxId: boxId,
          taskTaken: false,
          taskTemplateId: 'sowing'
        });
      }      
    }) 
  }
  return 0;
})

exports.updateHarvestTask = functions.firestore
.document('/gardenBox/{boxId}')
.onUpdate((snap:any, context:any) => {
  const dataAfter = snap.after.data();
  const boxId = snap.after.id;
  const harvestMonth = new Date(dataAfter.timeToHarvest.toDate()).getMonth();
  const currentMonth = new Date().getMonth();
  const harvestDate = new Date(dataAfter.timeToHarvest.toDate()).getDate();
  const currentDate = new Date().getDate();
  const box = tasks.where('gardenBoxId','==',boxId);
  const harvestingTask = box.where('taskTemplateId','==','harvesting');

  if(harvestMonth === currentMonth && harvestDate === currentDate && dataAfter.plant !== 'empty'){
    harvestingTask.get().then((snapshot:any) => {
      if(snapshot.empty){
        console.log("Adding harvesting task to box: "+boxId);
        tasks.add({
          created: new Date(),
          finished: false,
          gardenBoxId: boxId,
          taskTaken: false,
          taskTemplateId: 'harvesting'
        });
      }
    })
  }
  return 0;
})


exports.updateStorm = functions.firestore
.document('/weather/data')
.onUpdate((snap:any, context:any) => {
  const weather = snap.after.data();
  const plants = db.collection('plants');
  
  if(weather.isStorm){
    gardenBox.get().then((snapshot:any) => {
      snapshot.forEach((box:any) => {
        const stormTask = tasks.where('gardenBoxId','==',box.id).where('taskTemplateId','==','storm');
        stormTask.get().then((stormCheck:any) => {
          console.log(stormCheck.empty);
          if(box.data().plant !== 'empty' && stormCheck.empty){
            plants.doc(box.data().plant).onSnapshot((plant:any) => {           
              if(!plant.data().canHandleStorm){
                tasks.add({
                  created: new Date(),
                  finished: false,
                  gardenBoxId: box.id,
                  taskTaken: false,
                  taskTemplateId: 'storm'
                });
              }
            })
          }
        })
      })
    })
  }else{
    tasks.get().then((snapshot:any) => {
      snapshot.forEach((task:any) => {
        if(task.data().taskTemplateId === 'storm'){
          return tasks.doc(task.id).delete();
        }
      })
    })
  }
  return 0;
})


exports.updateFrost = functions.firestore
.document('/weather/data')
.onUpdate((snap:any, context:any) => {
  const weather = snap.after.data();
  const plants = db.collection('plants');
  
  if(weather.isFrost){
    gardenBox.get().then((snapshot:any) => {
      snapshot.forEach((box:any) => {
        const frostTask = tasks.where('gardenBoxId','==',box.id).where('taskTemplateId','==','frost');
        frostTask.get().then((frostCheck:any) => {
          if(box.data().plant !== 'empty' && frostCheck.empty){
            plants.doc(box.data().plant).onSnapshot((plant:any) => {           
              if(!plant.data().canHandleFrost){
                tasks.add({
                  created: new Date(),
                  finished: false,
                  gardenBoxId: box.id,
                  taskTaken: false,
                  taskTemplateId: 'frost'
                });
              }
            })
          }
        })
      })
    })
  }else{
    tasks.get().then((snapshot:any) => {
      snapshot.forEach((task:any) => {
        if(task.data().taskTemplateId === 'frost'){
          return tasks.doc(task.id).delete();
        }
      })
    })
  }
  return 0;
})