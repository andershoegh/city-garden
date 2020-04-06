import React, { useState, FormEvent } from 'react';
import {
  IonItem,
  IonContent,
  IonButton,
  IonTextarea,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonButtons
} from '@ionic/react';
import { firebase } from '../../Utility/Firebase';

export interface AddNoteProps {
  closeModal: CallableFunction;
}

const AddNote: React.SFC<AddNoteProps> = props => {
  const { closeModal } = props;
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');
  const addNewNote = (e: FormEvent) => {
    e.preventDefault();
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
            <h2 className='ion-padding'>New note</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={addNewNote}>
          <div className='costum-item'>
            <IonItem>
              <IonLabel position='floating'>Author</IonLabel>
              <IonInput
                value={author}
                required={true}
                onIonChange={e => setAuthor(e.detail.value!)}
              />
            </IonItem>
          </div>

          <IonItem lines='none'>
            <IonLabel position='floating' className='costum-label'>
              Note...
            </IonLabel>
            <div className='costum-text-area'>
              <IonTextarea
                rows={7}
                maxlength={215}
                value={text}
                required={true}
                onIonChange={e => setText(e.detail.value!)}
              />
            </div>
          </IonItem>

          <IonToolbar>
            <IonButtons slot='end' className='ion-padding tester'>
              <IonButton onClick={() => closeModal()} color='danger' fill='solid'>
                Close
              </IonButton>
              <IonButton type='submit' fill='solid'>
                Submit
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </form>
      </IonContent>
    </>
  );
};

export default AddNote;
