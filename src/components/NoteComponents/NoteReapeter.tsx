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

export interface NoteRepeaterProps {
  notes: firebase.firestore.DocumentData[];
}

const NoteRepeater: React.SFC<NoteRepeaterProps> = props => {
  const { notes } = props;
  if (notes.length !== 0) {
    const notesArray = [
      notes.splice(0, 4),
      notes.splice(0, 4),
      notes.splice(0, 4)
    ];

    return (
      <IonGrid>
        {notesArray.map((nestedNotes, index) => (
          <div key={index + "Key"}>
            {nestedNotes.length ? (
              <IonRow key={index.toString()}>
                {nestedNotes.map((note, index1) => (
                  <IonCol key={index.toString() + index1.toString()}>
                    <IonCard>
                      <IonCardContent>
                        <IonText>{note.note}</IonText>
                        <IonCardSubtitle>- {note.author}</IonCardSubtitle>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            ) : null}
          </div>
        ))}
      </IonGrid>
    );
  } else return null;
};

export default NoteRepeater;
