import * as React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
  IonCardSubtitle
} from "@ionic/react";
import "./NoteStyle.css";

export interface NoteRepeaterProps {
  notes: firebase.firestore.DocumentData[];
}

const NoteRepeater: React.SFC<NoteRepeaterProps> = props => {
  const { notes } = props;

  return (
    <IonGrid>
      <IonRow>
        {notes.length !== 0
          ? notes.map((note, index) => (
              <IonCol size="3" key={index}>
                <IonCard>
                  <IonCardContent>
                    <div className="card-div">
                      <IonText>{note.note}</IonText>
                    </div>
                    <IonCardSubtitle>- {note.author}</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))
          : null}
      </IonRow>
    </IonGrid>
  );
};

export default NoteRepeater;
