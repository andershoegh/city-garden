import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonText,
  IonCardSubtitle
} from "@ionic/react";
import { firebase } from "../Utility/Firebase";

export interface MessageBoardProps {}

const MessageBoard: React.SFC<MessageBoardProps> = () => {
  const [notes, setNotes] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    console.log("running");
    let unsub: any;
    if (notes.length === 0) {
      unsub = firebase.getNotes().onSnapshot(snapShot => {
        let tempArray: firebase.firestore.DocumentData[];
        tempArray = [];
        let changes = snapShot.docChanges();
        console.log(changes);
        snapShot.forEach(doc => {
          tempArray = [...tempArray, doc.data()];
        });
        setNotes(tempArray);
      });
    }

    return () => {
      console.log("unsubbing");
      unsub();
    };
  }, [notes]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Opslagstavle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {notes.length !== 0
          ? notes.map((note, index) => (
              <IonCard key={index}>
                <IonCardContent>
                  <IonText>{note.note}</IonText>
                  <IonCardSubtitle>- {note.author}</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            ))
          : null}
      </IonContent>
    </IonPage>
  );
};

export default MessageBoard;
