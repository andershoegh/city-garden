import React, { useEffect, useState } from 'react';
import { firebase } from '../Utility/Firebase';
import './Events.css';
import { addOutline } from 'ionicons/icons';
import EventRepeater from '../components/EventComponents/EventRepeater';
import AddEvent from '../components/EventComponents/AddEvent';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonModal,
} from '@ionic/react';

interface EventsProps {}

const Events: React.FC = () => {
  const [events, setEvents] = useState<firebase.firestore.DocumentData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsub = firebase.getEvents().onSnapshot((snapShot) => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach((doc) => {
        if(new Date(doc.data().endTime.toDate()) > new Date()){
          tempArray = [...tempArray, { ...doc.data(), id: doc.id }];
        }else{
          firebase.db.collection('events').doc(doc.id).delete();
        }
      });
      setEvents(tempArray);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
          <IonButton slot='end' onClick={() => setModalOpen(true)} style={{ marginRight: '20px' }}>
            <IonIcon icon={addOutline} slot='start' />
            Event
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className='page-background'>
        <IonModal
          isOpen={modalOpen}
          onDidDismiss={() => setModalOpen(false)}
          cssClass='event-modal'
        >
          <AddEvent closeModal={() => setModalOpen(false)} />
        </IonModal>
        <EventRepeater events={events} />
      </IonContent>
    </IonPage>
  );
};

export default Events;
