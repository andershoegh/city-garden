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
  IonButtons,
  IonToggle,
} from '@ionic/react';
import { firebase } from '../../Utility/Firebase';

export interface AddNoteProps {
  closeModal: CallableFunction;
}

const AddNote: React.SFC<AddNoteProps> = (props) => {
  const { closeModal } = props;
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [announcement, setAnnouncement] = useState<boolean>(false);

  const addNewNote = (e: FormEvent) => {
    e.preventDefault();
    firebase
      .createNote(author, text, announcement)
      .then((msg) => {
        firebase.presentToast('Your note has successfully been added to the message board.');
        closeModal();
      })
      .catch((err) =>
        firebase.presentToast(
          'Something went wrong. We were unfortunately not able to save your note in the system. Please try again... If you see this message again, please contact the developers.'
        )
      );
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
                onIonChange={(e) => setAuthor(e.detail.value!)}
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
                onIonChange={(e) => setText(e.detail.value!)}
              />
            </div>
          </IonItem>

          <IonToolbar>
            <IonItem slot='start'>
              <IonLabel className=''>Is this an Announcement?</IonLabel>
              <IonToggle
                value='announcement'
                onIonChange={(e) => setAnnouncement(e.detail.checked)}
              />
            </IonItem>
            <IonButtons slot='end' className='ion-padding'>
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
