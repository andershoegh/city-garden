import * as React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
  IonCardSubtitle,
  IonCardHeader,
  IonIcon
} from "@ionic/react";
import "./NoteStyle.css";
import * as test from "../../CostumIcons/pushpin-outline.svg";

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
              <IonCol sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" key={index}>
                <IonCard>
                  <IonCardHeader>
                    <IonIcon
                      //src={"/assets/CostumIcons/pushpin-"++".svg"}
                      slot="end"
                      name=""
                    />
                  </IonCardHeader>
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
