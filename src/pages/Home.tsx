import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { firebase } from '../Utility/Firebase';
import { SideMenu } from '../components/TasksComponents/SideMenu';
import Have from './Have';
import { Link } from 'react-router-dom';

import MyMarquee from '../components/MyMarquee';

export interface infoCard {
  note: string;
  author: string;
}

const Home: React.FC = (props) => {
  const [tasks, setTasks] = useState<firebase.firestore.DocumentData[]>([]);
  const [selection, setSelection] = useState<string>('0');
  const [infoCardTextArray, setInfoCardTextArray] = useState<infoCard[]>([]);

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

    const unsubNotes = firebase.db
      .collection('notes')
      .where('pinned', '==', true)
      .onSnapshot((snapshot) => {
        let tempArray: infoCard[] = [];
        snapshot.forEach(
          (doc) =>
            (tempArray = [...tempArray, { note: doc.data().note, author: doc.data().author }])
        );
        setInfoCardTextArray(tempArray);
      });

    return () => {
      unsub();
      unsubNotes();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Garden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='page-background' style={{ height: '100%' }}>
        <IonGrid>
          <IonRow>
            <IonCol size='8'>
              <Have setSelection={setSelection} />
            </IonCol>
            <IonCol size='4'>
              <SideMenu selection={selection} setSelection={setSelection} tasks={tasks} />
              <Link to='/messageboard'>
                <IonCard className='info-card'>
                  <div style={{ width: '90%' }}>
                    <MyMarquee infoCardData={infoCardTextArray} />
                  </div>
                </IonCard>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
