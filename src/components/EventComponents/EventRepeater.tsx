import React, { useEffect, useState } from 'react';
import Event from './Event';
import './Event.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { firebase } from '../../Utility/Firebase';

interface EventRepeaterProps {
  events: firebase.firestore.DocumentData[];
}

export const EventRepeater: React.FC<EventRepeaterProps> = (props) => {
  const { events } = props;
  const [newEventMsg, setNewEventMsg] = useState(
    'Click the "+ Event" button to start planning a new event'
  );

  useEffect(() => {
    const eventMsgFunction = firebase.functions.httpsCallable('autoCreateGreatWeatherEvent');
    eventMsgFunction().then((res) => {
      setNewEventMsg(res.data);
    });
  });

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
            <h2>
              Seems like there are currently no events planned.
              <br />
              {newEventMsg}
            </h2>
          </div>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default EventRepeater;
