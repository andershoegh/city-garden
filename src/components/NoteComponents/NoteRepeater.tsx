import * as React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import "./NoteStyle.css";
import Note from "./Note";

export interface NoteRepeaterProps {
  notes: firebase.firestore.DocumentData[];
}

const NoteRepeater: React.SFC<NoteRepeaterProps> = props => {
  const { notes } = props;

  return (
    <IonGrid>
      <IonRow>
        { notes.map((note, index) => (
              <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12" key={index+note.id}>
                <Note note={note.note} author={note.author} pinned={note.pinned} id={note.id} key={note.id}/>
              </IonCol>
            ))}
      </IonRow>
    </IonGrid>
  );
};

export default NoteRepeater;
