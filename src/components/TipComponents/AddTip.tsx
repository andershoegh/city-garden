import React, { useState, FormEvent } from 'react';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonTextarea, 
  IonButtons, 
  IonButton 
} from '@ionic/react';
import { firebase } from '../../Utility/Firebase';
import './AddTip.css';

interface AddTipProps {
  plant: string;
  closeModal: CallableFunction;
}

const AddTip: React.FC<AddTipProps> = props => {
  const { plant, closeModal } = props;
  const [tip, setTip] = useState<string>('');

  const addNewTip = (e: FormEvent) => {
    e.preventDefault();
    firebase.createPlantTip(plant, tip)
    .then((msg) => {
      firebase.presentToast(
        'You have created a new tip. Thanks for sharing!'
      );
      closeModal();
    })
    .catch((err) => 
      firebase.presentToast(
        'An error has occurred! The tip could NOT be created, please try again.'
      )
    );
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h2 className='ion-padding'>New tip</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className='subtitle-text'>
          Create a new tip that will help others when working with {plant}.
        </p>
        <form onSubmit={addNewTip}>
          <IonItem lines='none'>
            <IonLabel position='floating' className='costum-label'>
              Tip...
            </IonLabel>
            <div className='costum-text-area'>
              <IonTextarea 
                rows={7}
                maxlength={130}
                value={tip}
                required={true}
                onIonChange={(e) => setTip(e.detail.value!)}
              />
            </div>
            <div
              className={
                tip.length < 130 ? 'tip-length' : 'tip-length red'
              }  
            >
              {tip.length}/130
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
}

export default AddTip;