import React, { useState, useCallback, useEffect } from 'react';
import {
  IonCard,
  IonCardContent,
  IonText,
  IonCardSubtitle,
  IonCardHeader,
  IonIcon,
  IonAlert
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { firebase } from '../../Utility/Firebase';

export interface NoteProps {
  note: string;
  author: string;
  pinned: boolean;
  id: string;
}

const Note: React.SFC<NoteProps> = ({ note, author, pinned, id }) => {
  const [pin, setPin] = useState<string>(pinned ? 'filled' : 'outline');
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    setPin(pinned ? 'filled' : 'outline');
  }, [pinned]);

  const pinNote = useCallback(() => {
    firebase.updatePin(id).update({ pinned: !pinned });
  }, [pinned, id]);

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
        subHeader={pinned ? 'This note is pinned!' : ''}
        message={'Are you sure you want to delete this note?'}
        buttons={[
          {
            text: 'Cancel',
            handler: () => {
              setAlert(false);
            }
          },
          {
            text: 'Delete',
            handler: () => {
              setAlert(false);
              deleteTheNote(id);
            }
          }
        ]}
      />

      <IonCard>
        <IonCardHeader>
          <IonIcon
            src={'/assets/CostumIcons/pushpin-' + pin + '.svg'}
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
