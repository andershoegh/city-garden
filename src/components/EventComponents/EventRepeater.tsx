import React from 'react';
import Event from './Event';
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
          <div>
            <h2>Seems like there's currently no events available...</h2>
          </div>
        )}
      </IonRow>
    </IonGrid>
  );
}

export default EventRepeater;