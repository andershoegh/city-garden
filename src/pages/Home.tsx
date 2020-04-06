import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { firebase } from '../Utility/Firebase';
import { SideMenu } from '../components/TasksComponents/SideMenu';
import Have from './Have';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<firebase.firestore.DocumentData[]>([]);
  const [selection, setSelection] = useState<string>('0');

  useEffect(() => {
    const unsub = firebase.getTasks().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, { ...doc.data(), id: doc.id }];
      });
      console.log('set');
      setTasks(tempArray);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Garden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ height: '100%' }}>
        <IonGrid className='page-background'>
          <IonRow>
            <IonCol size='8'>
              <Have setSelection={setSelection} />
            </IonCol>
            <IonCol size='4'>
              <SideMenu selection={selection} setSelection={setSelection} tasks={tasks} />
              <IonCard className='info-card'>
                Hello! Give me a message to display, plz daddy{' '}
                <span role='img' aria-label='emoji'>
                  😘
                </span>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
