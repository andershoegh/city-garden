import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { firebase } from '../Utility/Firebase';
import { SideMenu } from '../components/TasksComponents/SideMenu';
import Have from './Have';

export interface infoCard {
  note: string;
  author: string;
}

const Home: React.FC = (props) => {
  const [tasks, setTasks] = useState<firebase.firestore.DocumentData[]>([]);
  const [selection, setSelection] = useState<string>('0');

  useEffect(() => {
    const unsub = firebase.getTasks().onSnapshot((snapShot) => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach((doc) => {
        tempArray = [...tempArray, { ...doc.data(), id: doc.id, idSort: doc.data().gardenBoxId }];
      });

      tempArray.sort((a: any, b: any) => Number(a.idSort) - Number(b.idSort));
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
      <IonContent
        style={{ height: '90vh', display: 'flex', alignItems: 'center' }}
        className='page-background'
        slot='fixed'
      >
        <img alt='bonfire' src={require('../pics/garden-bonfire.png')} className='bonfire-img' />
        <IonGrid slot='fixed'>
          <IonRow>
            <IonCol size='8' style={{ alignSelf: 'center', height: '80vh' }}>
              <Have setSelection={setSelection} tasks={tasks} />
            </IonCol>
            <IonCol size='4'>
              <SideMenu selection={selection} setSelection={setSelection} tasks={tasks} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
