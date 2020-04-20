import React, { useState, useCallback } from 'react';
import {
  IonCard,
  IonCardContent,
  IonText,
  IonCardSubtitle,
  IonCardHeader,
  IonIcon,
  IonAlert,
} from '@ionic/react';
import { trashOutline, megaphone, megaphoneOutline } from 'ionicons/icons';
import { firebase } from '../../Utility/Firebase';

export interface NoteProps {
  note: string;
  author: string;
  pinned: boolean;
  id: string;
  created: Date;
}

const Note: React.SFC<NoteProps> = ({ note, author, pinned, id, created }) => {
  const [alert, setAlert] = useState<boolean>(false);
  const [unPinAlert, setUnPinAlert] = useState<boolean>(false);

  const pinNote = useCallback(() => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 14);

    if (pinned && created <= dt) {
      setUnPinAlert(true);
    } else {
      firebase.updatePin(id).update({ pinned: !pinned });
    }
  }, [pinned, id, created]);

  const deleteTheNote = useCallback(
    (e: any) => {
      firebase.deleteNote(id);
    },
    [id]
  );

  return (
    <>
      <IonAlert
        isOpen={alert}
        header={'Delete?'}
        subHeader={pinned ? 'This note is an announcement!' : ''}
        message={'Are you sure you want to delete this note?'}
        onDidDismiss={() => setAlert(false)}
        buttons={[
          {
            text: 'Cancel',
            handler: () => {
              setAlert(false);
            },
          },
          {
            text: 'Delete',
            handler: () => {
              setAlert(false);
              deleteTheNote(id);
            },
          },
        ]}
      />

      <IonAlert
        isOpen={unPinAlert}
        header={'Delete?'}
        subHeader={'This note is an announcement!'}
        message={
          'This note will be deleted if you remove it as an announcement. Are you sure you want to deletee this announcement?'
        }
        onDidDismiss={() => setUnPinAlert(false)}
        buttons={[
          {
            text: 'Cancel',
            handler: () => {
              setUnPinAlert(false);
            },
          },
          {
            text: 'Delete',
            handler: () => {
              setUnPinAlert(false);
              deleteTheNote(id);
            },
          },
        ]}
      />

      <IonCard>
        <IonCardHeader>
          <IonIcon
            icon={pinned ? megaphone : megaphoneOutline}
            className='pin-icon'
            onClick={pinNote}
          ></IonIcon>
        </IonCardHeader>
        <IonCardContent>
          <div className='card-div'>
            <IonText>{note}</IonText>
          </div>
          <IonCardSubtitle>- {author} </IonCardSubtitle>
        </IonCardContent>
        <IonIcon icon={trashOutline} className='delete-icon' onClick={() => setAlert(true)} />
      </IonCard>
    </>
  );
};

export default Note;
