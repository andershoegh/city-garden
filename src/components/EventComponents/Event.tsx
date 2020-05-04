import React, { useState } from 'react';
import './Event.css';
import { timeOutline, personOutline, peopleOutline } from 'ionicons/icons';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonIcon,
  IonButton,
  IonModal,
} from '@ionic/react';
import EventSignUp from './EventSignUp';

interface EventProps {
  event: firebase.firestore.DocumentData;
}

export const Event: React.FC<EventProps> = (props) => {
  const { event } = props;

  const [openSignUp, setOpenSignUp] = useState<boolean>(false);
  const eventStart = event.startTime.toDate();
  const eventEnd = event.endTime.toDate();
  const date = Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'numeric' }).format(
    eventStart
  );
  const startTime = Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(
    eventStart
  );
  const endTime = Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(
    eventEnd
  );

  const attendees = event.attendees.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <IonModal
        cssClass='sign-up-card'
        isOpen={openSignUp}
        onDidDismiss={() => setOpenSignUp(false)}
      >
        <EventSignUp event={event.title} id={event.id} closeModal={() => setOpenSignUp(false)} />
      </IonModal>
      <IonCard className='event-card'>
        <IonCardHeader></IonCardHeader>
        <IonCardContent>
          <div>
            <h1>{event.title}</h1>
            <div className='organizer'>
              <IonIcon icon={personOutline} slot='start' className='clipboard-icon' />
              <span>Organized by: {event.organizer}</span>
            </div>
            <div className='date'>
              <IonIcon icon={timeOutline} slot='start' className='date-icon' />
              <span>
                {date} <br />
                {startTime} - {endTime}
              </span>
            </div>
            <div className='description'>{event.description}</div>
            <div className='attendees'>
              <IonIcon icon={peopleOutline} slot='start' className='attendee-icon' />
              <div style={{ width: '50%' }}>
                <span>Attendees</span>
                <IonList className='event-list'>
                  {attendees.length !== 0 ? (
                    attendees.map((attendee: string, index: number) => (
                      <div key={index} className='event-list-item'>
                        {attendee}
                      </div>
                    ))
                  ) : (
                    <div className='event-list-item'>
                      No one has signed up to attend this event yet
                    </div>
                  )}
                </IonList>
              </div>
              <IonButton
                size='small'
                style={{ position: 'absolute', bottom: '15px', right: '5px' }}
                onClick={() => setOpenSignUp(true)}
              >
                Sign up
              </IonButton>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Event;
