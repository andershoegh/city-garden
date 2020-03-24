import React, { useState } from "react";
import {
  IonItem,
  IonContent,
  IonButton,
  IonTextarea,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel
} from "@ionic/react";
import { firebase } from "../../Utility/Firebase";

export interface AddNoteProps {
  closeModal: CallableFunction;
}

const AddNote: React.SFC<AddNoteProps> = props => {
  const { closeModal } = props;
  const [author, setAuthor] = useState<string>("");
  const [text, setText] = useState<string>("");
  const addNewNote = () => {
    firebase
      .createNote(author, text)
      .then(msg => {
        console.log(msg);
        closeModal();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h2 className="ion-padding">Hi, write a note to your peers!</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Author</IonLabel>
          <IonInput
            value={author}
            required={true}
            onIonChange={e => setAuthor(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Note...</IonLabel>
          <IonTextarea
            value={text}
            required={true}
            onIonChange={e => setText(e.detail.value!)}
          />
        </IonItem>
        <IonButton onClick={() => closeModal()} color="danger">
          Close
        </IonButton>
        <IonButton onClick={addNewNote}>Submit</IonButton>
      </IonContent>
    </>
  );
};

export default AddNote;
