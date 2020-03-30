import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonRefresher,
  IonRefresherContent,
  IonIcon
} from "@ionic/react";
import { addOutline, addCircleOutline } from "ionicons/icons";
import { firebase } from "../Utility/Firebase";
import AddNote from "../components/NoteComponents/AddNoteComponent";
import NoteRepeater from "../components/NoteComponents/NoteRepeater";

export interface MessageBoardProps {}

const MessageBoard: React.SFC<MessageBoardProps> = () => {
  const [notes, setNotes] = useState<firebase.firestore.DocumentData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [subscribe, setSubscribe] = useState<Function>();

  const update = (event: any) => {
    if (subscribe !== undefined) {
      subscribe();
    }

    const dt = new Date();
    dt.setDate(dt.getDate() - 14);

    setSubscribe(() =>
      firebase
        .getNotes()
        .where("created", ">=", dt)
        .onSnapshot(snapShot => {
          let tempArray: firebase.firestore.DocumentData[];
          tempArray = [];
          snapShot.forEach(doc => {
            tempArray = [...tempArray, doc.data()];
          });

          setNotes(tempArray);
          if (event !== null) {
            setTimeout(() => event.detail.complete(), 1000);
          }
        })
    );
  };

  useEffect(() => {
    update(null);

    return () => {
      if (subscribe !== undefined) {
        subscribe();
      }
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Opslagstavle</IonTitle>
          <IonButton
            slot="end"
            onClick={() => setModalOpen(true)}
            style={{ marginRight: "20px" }}
          >
            <IonIcon icon={addOutline} slot="start" />
            Write a Note
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={e => update(e)}>
          <IonRefresherContent />
        </IonRefresher>
        <IonModal isOpen={modalOpen}>
          <AddNote closeModal={() => setModalOpen(false)} />
        </IonModal>
        <NoteRepeater notes={notes} />
      </IonContent>
    </IonPage>
  );
};

export default MessageBoard;
