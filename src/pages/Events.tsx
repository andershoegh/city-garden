import React, { useEffect, useState } from 'react';
import { firebase } from '../Utility/Firebase';
import './Events.css';
import { addOutline } from 'ionicons/icons';
import EventRepeater from '../components/EventComponents/EventRepeater';
import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/react';

interface EventsProps {}

const Events: React.FC = () => {
  const [events, setEvents] = useState<firebase.firestore.DocumentData[]>([])

  useEffect(() => {
    const unsub = firebase.getEvents().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, { ...doc.data(), id: doc.id }];
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
          <IonButton slot='end' style={{ marginRight: '20px' }}>
              <IonIcon icon={addOutline} slot='start' />
              Event
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <EventRepeater events={events} />
      </IonContent>
    </IonPage>
  );
}

export default Events;