import React, { FormEvent, useState } from 'react';
import { firebase } from '../../Utility/Firebase';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonTextarea,
  IonButtons,
  IonButton,
} from '@ionic/react';
import './EventSignUp.css';

interface EventSignUpProps {
  event: string;
  id: string;
  closeModal: CallableFunction;
}

const EventSignUp: React.FC<EventSignUpProps> = (props) => {
  const { event, id, closeModal } = props;
  const [name, setName] = useState<string>('');

  const signUp = (e: FormEvent) => {
    e.preventDefault();
    firebase
      .eventSignUp(id, name)
      .then((msg) => {
        firebase.presentToast(name + ' has been signed up for the event: ' + event);
        closeModal();
      })
      .catch((err) =>
        firebase.presentToast(
          'An error has occurred. We could NOT sign you up for the event. Please try again later.'
        )
      );
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h2 className='ion-padding'>Sign up</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <span className='sign-up-message'>
          To sign up for {event}, please enter your full name.
        </span>
        <form onSubmit={signUp}>
          <IonItem className='text-input'>
            <IonTextarea
              rows={1}
              maxlength={40}
              placeholder='insert full name here...'
              value={name}
              required={true}
              onIonChange={(e) => setName(e.detail.value!)}
            />
          </IonItem>

          <IonToolbar>
            <IonButtons className='buttons'>
              <IonButton onClick={() => closeModal()} color='danger' fill='solid'>
                Close
              </IonButton>
              <IonButton type='submit' color='success' fill='solid'>
                Sign up
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </form>
      </IonContent>
    </>
  );
};

export default EventSignUp;
