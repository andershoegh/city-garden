import React, { FormEvent, useState } from 'react';
import { firebase } from '../../Utility/Firebase';
import './AddEvent.css';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonTextarea, 
  IonDatetime, 
  IonButtons, 
  IonButton } from '@ionic/react';

export interface AddEventProps {
  closeModal: CallableFunction;
}

const AddEvent: React.FC<AddEventProps> = props => {
  const { closeModal } = props;
  
  const year = Intl.DateTimeFormat('en-GB', {year: 'numeric'}).format(Date.now());
  const month = Intl.DateTimeFormat('en-GB', {month: '2-digit'}).format(Date.now());
  const day = Intl.DateTimeFormat('en-GB', {day: '2-digit'}).format(Date.now());
  const minDate = year + '-' + month + '-' + day;
  const maxDate = parseInt(year) + 2 + '-' + month + '-' + day;
  
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [minEndTime, setMinEndTime] = useState<string>('00:00');
  const addNewEvent = (e: FormEvent) => {
    e.preventDefault();
    firebase
      .createEvent(title, description, new Date(startTime), new Date(endTime))
      .then(msg => {
        console.log(msg);
        closeModal();
      })
      .catch(err => console.log(err))
  }

  const newDate = (newDate: string) => {   
    if (startTime !== '') {
      let tempStartTime = startTime.replace(startTime.split('T')[0], newDate.split('T')[0]);
      setStartTime(tempStartTime);
      console.log(tempStartTime.split('T')[1].split('+')[0].split('.')[0]);
    }

    if (endTime !== '') {
      let tempEndTime = endTime.replace(endTime.split('T')[0], newDate.split('T')[0]);
      setEndTime(tempEndTime);
    }

    setDate(newDate);
  }

  const newStart = (newStartTime: string) => {
    setStartTime(newStartTime);
    let time = newStartTime.split('T')[1].split('+')[0].split('.')[0];
    setMinEndTime(time);

    if (endTime !== '') {
      let currEndTime = endTime.split('T')[1].split('+')[0].split('.')[0];

      if (currEndTime < time) {
        setEndTime(endTime.replace(endTime.split('T')[1].split('+')[0].split('.')[0], time));
      }
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h2 className='ion-padding'>
              New event
            </h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={addNewEvent}>
          <div className='costum-item'>
            <IonItem>
              <IonLabel position='floating'>
                Title
              </IonLabel>
              <IonInput
                value={title}
                required={true}
                onIonChange={e => setTitle(e.detail.value!)}
              />
            </IonItem>
            <IonItem lines='none'>
              <IonLabel position='floating'>Date</IonLabel>
              <IonDatetime 
                placeholder='Select the date'
                displayFormat='DDD D/M/YYYY'
                min={minDate}
                max={maxDate}
                value={date}
                onIonChange={e => newDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem lines='none'>
              <IonLabel position='floating'>Start time</IonLabel>
              <IonDatetime 
                placeholder='Select starting time'
                displayFormat='HH:mm'
                value={startTime}
                onIonChange={e => newStart(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>End time</IonLabel>
              <IonDatetime
                placeholder='Select ending time'
                displayFormat='HH:mm'
                min={minEndTime}
                value={endTime}
                onIonChange={e => setEndTime(e.detail.value!)}
              />
            </IonItem>
            <IonItem lines='none'>
              <IonLabel position='floating' className='costum-label'>
                Description...
              </IonLabel>
              <div className='costum-text-area'>
                <IonTextarea
                  rows={7}
                  maxlength={215}
                  value={description}
                  required={true}
                  onIonChange={e => setDescription(e.detail.value!)}
                />
              </div>
              <div className={description.length < 215 ? 'description-length' : 'description-length red'}>
                {description.length}/215
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
          </div>
        </form>
      </IonContent>
    </>
  );
}

export default AddEvent;