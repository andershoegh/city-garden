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

exports.autoTest = functions.pubsub.schedule('* * * * *').onRun((context) => {
  console.log('this runs every minute');
  console.log(context);
  return admin.collection('logs').add({ time: admin.firestore.Timestamp.now() });
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
