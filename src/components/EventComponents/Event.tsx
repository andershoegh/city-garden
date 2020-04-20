import React from 'react';
import './Event.css';
import { timeOutline, personOutline } from 'ionicons/icons';
import { 
  IonCard, 
  IonCardHeader, 
  IonCardContent, 
  IonList, 
  IonIcon } from '@ionic/react';

interface EventProps {
  event: firebase.firestore.DocumentData;
}

export const Event: React.FC<EventProps> = props => {
  const { event } = props;

  const eventStart = event.startTime.toDate();
  const eventEnd = event.endTime.toDate();
  const date = Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'numeric'}).format(eventStart);
  const startTime = Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(eventStart);
  const endTime = Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(eventEnd);

  const attendees = event.attendees.sort((a, b) => {
    if(a.toLowerCase() < b.toLowerCase()) { return -1; }
    if(a.toLowerCase() > b.toLowerCase()) { return 1; }
    return 0;
  })

  return (
    <IonCard className='event-card'>
      <IonCardHeader>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <h1>{event.title}</h1>
          <div className='date'>
            <IonIcon icon={timeOutline} slot='start' className='date-icon'/>
            <span>
              {date} <br />
              {startTime} - {endTime}
            </span>
          </div>
          <div className='description'>{event.description}</div>
          <div className='attendees'>
            <IonIcon icon={personOutline} slot='start' className='attendee-icon' />
            <span>Attendees</span>
          </div>
          <IonList className='event-list'>
            {attendees.length !== 0 ? 
              attendees.map((attendee, index) => (
              <div key={index} className='event-list-item'>
                {attendee}
              </div>))
              :
              <div className='event-list-item'>No one has signed up to attend this event yet</div>}
          </IonList>
        </div>
      </IonCardContent>
    </IonCard>
  );
}

export default Event;