import * as React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './NoteStyle.css';
import Note from './Note';

export interface NoteRepeaterProps {
  notes: firebase.firestore.DocumentData[];
}

const NoteRepeater: React.SFC<NoteRepeaterProps> = (props) => {
  const { notes } = props;

  return (
    <IonGrid>
      <IonRow>
        {notes.length ? (
          notes.map((note, index) => (
            <IonCol sizeXl='3' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12' key={index + note.id}>
              <Note
                note={note.note}
                author={note.author}
                pinned={note.pinned}
                id={note.id}
                created={note.created.toDate()}
                key={note.id}
              />
            </IonCol>
          ))
        ) : (
          <div className='no-note-content'>
            <h2>Seems like there's currently no posts available...</h2>
          </div>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default NoteRepeater;
