import * as functions from 'firebase-functions';
import * as moment from 'moment';
const admin = require('firebase-admin');
admin.initializeApp();

//firestore trigger to delete tasks
exports.deleteTasks = functions.firestore
  .document('/alltasks/{userId}')
  .onUpdate((snap: any, context: any) => {
    const data = snap.after.data();
    const id = snap.after.id;

    if (data.finished) {
      switch (data.taskTemplateId) {
        case 'watering':
          gardenBox.doc(data.gardenBoxId).update({ lastWatered: new Date() });
          break;

        case 'fertilizing':
          gardenBox.doc(data.gardenBoxId).update({ lastFertilized: new Date() });
          break;

        case 'weeding':
          gardenBox.doc(data.gardenBoxId).update({ lastWeeding: new Date() });
          break;

        case 'dirtTurning':
          gardenBox.doc(data.gardenBoxId).update({ lastDirtTurned: new Date() });
          break;

        case 'harvesting':
          gardenBox.doc(data.gardenBoxId).update({ plant: 'empty', timeToHarvest: null });
          break;

        default:
          console.log('Task update not implemented yet or just deleting');
          break;
      }
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
  .onUpdate((snap: any, context: any) => {
    const dataAfter = snap.after.data();
    const boxId = snap.after.id;
    const currentDate = new Date().getDate();
    const lastWaterDate = new Date(dataAfter.lastWatered.toDate()).getDate();
    const box = tasks.where('gardenBoxId', '==', boxId);
    const waterTask = box.where('taskTemplateId', '==', 'watering');

    if (
      dataAfter.soilMoisture < 80 &&
      currentDate !== lastWaterDate &&
      dataAfter.plant !== 'empty'
    ) {
      waterTask.get().then((snapshot: any) => {
        if (snapshot.empty) {
          console.log('Adding watering task to box: ' + boxId);
          return tasks.add({
            created: new Date(),
            finished: false,
            gardenBoxId: boxId,
            taskTaken: false,
            taskTemplateId: 'watering',
          });
        } else {
          console.log('There is already a task');
        }
      });
      return 0;
    } else {
      waterTask.get().then((snapshot: any) => {
        if (snapshot.empty) {
          return null;
        } else if (snapshot.docs[0].data().taskTaken === false) {
          console.log('Delete Task: ' + snapshot.docs[0].id);
          return tasks.doc(snapshot.docs[0].id).delete();
        }
      });
      return 0;
    }
  });

exports.updateFertilizerTask = functions.firestore
  .document('/gardenBox/{boxId}')
  .onUpdate((snap: any, context: any) => {
    const dataAfter = snap.after.data();
    const boxId = snap.after.id;
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    const lastFertilizedMonth = new Date(dataAfter.lastFertilized.toDate()).getMonth();
    const lastFertilizedDate = new Date(dataAfter.lastFertilized.toDate()).getDate();
    const box = tasks.where('gardenBoxId', '==', boxId);
    const fertilizerTask = box.where('taskTemplateId', '==', 'fertilizing');

    if (
      currentMonth !== lastFertilizedMonth &&
      currentDate >= lastFertilizedDate &&
      dataAfter.plant !== 'empty'
    ) {
      fertilizerTask.get().then((snapshot: any) => {
        if (snapshot.empty) {
          console.log('Add fertilizer task to bed: ' + boxId);
          return tasks.add({
            created: new Date(),
            finished: false,
            gardenBoxId: boxId,
            taskTaken: false,
            taskTemplateId: 'fertilizing',
          });
        }
      });
    }
    return 0;
  });

exports.updateWeedingTask = functions.firestore
  .document('/gardenBox/{boxId}')
  .onUpdate((snap: any, context: any) => {
    const dataAfter = snap.after.data();
    const boxId = snap.after.id;
    const lastWeedingDate = new Date(dataAfter.lastWeeding.toDate()).getDate();
    const currentDate = new Date().getDate();
    const lastWeedingDay = new Date(dataAfter.lastWeeding.toDate()).getDay();
    const currentDay = new Date().getDay();
    const box = tasks.where('gardenBoxId', '==', boxId);
    const weedingTask = box.where('taskTemplateId', '==', 'weeding');

    if (
      lastWeedingDate !== currentDate &&
      currentDay === lastWeedingDay &&
      dataAfter.plant !== 'empty'
    ) {
      weedingTask.get().then((snapshot: any) => {
        if (snapshot.empty) {
          console.log('Adding weeding task to box: ' + boxId);
          return tasks.add({
            created: new Date(),
            finished: false,
            gardenBoxId: boxId,
            taskTaken: false,
            taskTemplateId: 'weeding',
          });
        }
      });
    }
    return 0;
  });

exports.updateSowTask = functions.firestore
  .document('/gardenBox/{boxId}')
  .onUpdate((snap: any, context: any) => {
    const dataAfter = snap.after.data();
    const boxId = snap.after.id;
    const box = tasks.where('gardenBoxId', '==', boxId);
    const sowingTask = box.where('taskTemplateId', '==', 'sowing');

    if (dataAfter.plant === 'empty') {
      sowingTask.get().then((snapshot: any) => {
        if (snapshot.empty) {
          console.log('Adding sowing task to box: ' + boxId);
          return tasks.add({
            created: new Date(),
            finished: false,
            gardenBoxId: boxId,
            taskTaken: false,
            taskTemplateId: 'sowing',
          });
        }
      });
    }
    return 0;
  });

exports.updateHarvestTask = functions.firestore
  .document('/gardenBox/{boxId}')
  .onUpdate((snap: any, context: any) => {
    const dataAfter = snap.after.data();
    const boxId = snap.after.id;
    const harvestMonth = new Date(dataAfter.timeToHarvest.toDate()).getMonth();
    const currentMonth = new Date().getMonth();
    const harvestDate = new Date(dataAfter.timeToHarvest.toDate()).getDate();
    const currentDate = new Date().getDate();
    const box = tasks.where('gardenBoxId', '==', boxId);
    const harvestingTask = box.where('taskTemplateId', '==', 'harvesting');

    if (
      harvestMonth === currentMonth &&
      harvestDate === currentDate &&
      dataAfter.plant !== 'empty'
    ) {
      harvestingTask.get().then((snapshot: any) => {
        if (snapshot.empty) {
          console.log('Adding harvesting task to box: ' + boxId);
          tasks.add({
            created: new Date(),
            finished: false,
            gardenBoxId: boxId,
            taskTaken: false,
            taskTemplateId: 'harvesting',
          });
        }
      });
    }
    return 0;
  });

exports.autoCreateGreatWeatherEvent = functions.https.onCall((data, context) => {
  const APICall =
    'https://api.openweathermap.org/data/2.5/onecall?lat=57.02&lon=9.97&units=metric&appid=2979ef06a8fd8560f008aabb2bba0406';
  const MIN_TEMP = 20;

  function compare_temp(a: any, b: any) {
    const comp_a = a.feels_like.eve;
    const comp_b = b.feels_like.eve;

    if (comp_a === comp_b) {
      return 0;
    } else {
      return comp_b - comp_a;
    }
  }
  // Check if theres no events.
  db.collection('events')
    .get()
    .then((docs: any) => {
      if (docs.empty) {
        db.collection('dataForAutoCreate')
          .doc('events')
          .get()
          .then((doc: FirebaseFirestore.DocumentData) => {
            if (doc !== undefined) {
              const lastEvent = moment(doc.data().lastEvent.seconds * 1000);
              if (lastEvent < moment().subtract('1', 'month')) {
                // Last event ended more than 1 month ago, which means we now want to suggest new Events.
                fetch(APICall)
                  .then((res) => res.json())
                  .then((result) => {
                    const daily = result.daily.sort(compare_temp);
                    const bestDay = daily[0].feels_like;

                    if (bestDay.day >= MIN_TEMP || bestDay.eve >= MIN_TEMP) {
                      //Weather feels like more than MIN_TEMP
                      const bestDayDate: string = moment(daily[0].dt * 1000)
                        .format('Do of MMMM')
                        .toString();
                      return (
                        "You guys haven't held an event for a month, it will be great weather on the " +
                        bestDayDate +
                        '\nConsider planning a new event!'
                      );
                    }
                  })
                  .catch((err) => {
                    console.log('Error getting weather data');
                    console.log(err);
                    return 'Click the \"+ Event\" button to start planning a new event.';
                  });
              }
            }
          })
          .catch((err: any) => {
            console.log(err);
            return 'Click the \"+ Event\" button to start planning a new event.';
          });
      }
    })
    .catch((err: any) => {
      console.log(err);
      return 'Click the \"+ Event\" button to start planning a new event.';
    });
  return 'Click the \"+ Event\" button to start planning a new event.';
});

exports.createDirtTurnTask = functions.firestore
  .document('gardenBox/{gardenBoxId}')
  .onUpdate((snap: any, context: any) => {
    //This code should be run once a day
    const data = snap.after.data();
    const boxId = snap.after.id;
    console.log('Checking if new soil turning task shoud be created');
    if (moment(data.lastDirtTurned.seconds * 1000) < moment().subtract('1', 'week')) {
      // Create new Task
      console.log("It's more than a week ago the task was last completed");
      tasks
        .where('gardenBoxId', '==', boxId)
        .where('taskTemplateId', '==', 'dirtTurning')
        .get()
        .then((docs: any) => {
          if (docs.empty) {
            console.log('the task does not currently exist, it will now be created.');
            return tasks.add({
              created: new Date(),
              finished: false,
              gardenBoxId: boxId,
              taskTaken: false,
              taskTemplateId: 'dirtTurning',
            });
          }
        });
    }
    return null;
  });

exports.updateStorm = functions.firestore
  .document('/weather/data')
  .onUpdate((snap: any, context: any) => {
    const weather = snap.after.data();
    const plants = db.collection('plants');

    if (weather.isStorm) {
      gardenBox.get().then((snapshot: any) => {
        snapshot.forEach((box: any) => {
          const stormTask = tasks
            .where('gardenBoxId', '==', box.id)
            .where('taskTemplateId', '==', 'storm');
          stormTask.get().then((stormCheck: any) => {
            console.log(stormCheck.empty);
            if (box.data().plant !== 'empty' && stormCheck.empty) {
              plants.doc(box.data().plant).onSnapshot((plant: any) => {
                if (!plant.data().canHandleStorm) {
                  tasks.add({
                    created: new Date(),
                    finished: false,
                    gardenBoxId: box.id,
                    taskTaken: false,
                    taskTemplateId: 'storm',
                  });
                }
              });
            }
          });
        });
      });
    } else {
      tasks.get().then((snapshot: any) => {
        snapshot.forEach((task: any) => {
          if (task.data().taskTemplateId === 'storm') {
            return tasks.doc(task.id).delete();
          }
        });
      });
    }
    return 0;
  });

exports.updateFrost = functions.firestore
  .document('/weather/data')
  .onUpdate((snap: any, context: any) => {
    const weather = snap.after.data();
    const plants = db.collection('plants');

    if (weather.isFrost) {
      gardenBox.get().then((snapshot: any) => {
        snapshot.forEach((box: any) => {
          const frostTask = tasks
            .where('gardenBoxId', '==', box.id)
            .where('taskTemplateId', '==', 'frost');
          frostTask.get().then((frostCheck: any) => {
            if (box.data().plant !== 'empty' && frostCheck.empty) {
              plants.doc(box.data().plant).onSnapshot((plant: any) => {
                if (!plant.data().canHandleFrost) {
                  tasks.add({
                    created: new Date(),
                    finished: false,
                    gardenBoxId: box.id,
                    taskTaken: false,
                    taskTemplateId: 'frost',
                  });
                }
              });
            }
          });
        });
      });
    } else {
      tasks.get().then((snapshot: any) => {
        snapshot.forEach((task: any) => {
          if (task.data().taskTemplateId === 'frost') {
            return tasks.doc(task.id).delete();
          }
        });
      });
    }
    return 0;
  });
