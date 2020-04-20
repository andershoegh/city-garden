import React from 'react';
import Event from './Event';
import './Event.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

interface EventRepeaterProps {
  events: firebase.firestore.DocumentData[];
}

export const EventRepeater: React.FC<EventRepeaterProps> = props => {
  const { events } = props;

  return (
    <IonGrid>
      <IonRow>
        {events.length ? (
          events.map((event, index) => (
            <IonCol key={index}>
              <Event event={event} />
            </IonCol>
          ))
        ) : (
          <div className='no-events'>
            <h2>Seems like there are currently no events planned.
              <br />
              Click the "+ Event" button to start planning a new event.
            </h2>
          </div>
        )}
      </IonRow>
    </IonGrid>
  );
}

export default EventRepeater;