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
  IonCardSubtitle,
  IonButton,
  IonModal
} from "@ionic/react";
import { firebase } from "../Utility/Firebase";
import AddNote from "../components/NoteComponents/AddNoteComponent";

export interface MessageBoardProps {}

const MessageBoard: React.SFC<MessageBoardProps> = () => {
  const [notes, setNotes] = useState<firebase.firestore.DocumentData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsub = firebase.getNotes().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      let changes = snapShot.docChanges();
      console.log(changes);
      snapShot.forEach(doc => {
        tempArray = [...tempArray, doc.data()];
      });
      setNotes(tempArray);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Opslagstavle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal isOpen={modalOpen}>
          <AddNote closeModal={() => setModalOpen(false)} />
        </IonModal>
        {/* <NoteRepeater notes={notes} /> */}
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
        <IonButton onClick={() => setModalOpen(true)}>Write a Note</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MessageBoard;
