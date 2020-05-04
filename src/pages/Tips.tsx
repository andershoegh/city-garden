import React, { useState, useEffect } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCardContent, 
  IonCard, 
  IonItemDivider, 
  IonModal
} from '@ionic/react';
import { firebase } from '../Utility/Firebase';
import Tip from '../components/TipComponents/Tip';
import AddTip from '../components/TipComponents/AddTip'
import './Tips.css';

interface TipsProps {}

const Tips: React.FC<TipsProps> = () => {
  const [plants, setPlants] = useState<firebase.firestore.DocumentData[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsub = firebase.getPlants().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, {...doc.data(), id: doc.id}]
      });
      setPlants(tempArray);
    });

    return () => {
      unsub();
    };
  }, []);

  const newTip = (plant: string) => {
    setSelectedPlant(plant);
    setModalOpen(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal 
          cssClass='costum-modal'
          isOpen={modalOpen} 
          onDidDismiss={() => setModalOpen(false)}
        >
          <AddTip plant={selectedPlant} closeModal={() => setModalOpen(false)} />
        </IonModal>
        <IonItemDivider sticky={true}>
          <IonCard className='info-card'>
            <IonCardContent>
              This page will let you read tips on how to best care for the crops in the garden. 
              The tips are created by the community. If you have a good tip, be sure to share it!
            </IonCardContent>
          </IonCard>
        </IonItemDivider>
        <IonGrid className='tips-grid'>
          <IonRow className='row'>
            <Tip 
              plant='carrots' 
              plantInfo={plants.filter(plant => plant.id === 'carrots')} 
              newTip={newTip} 
            />
          </IonRow>
          <IonRow className='row'>
            <Tip 
              plant='potatoes' 
              plantInfo={plants.filter(plant => plant.id === 'potatoes')} 
              newTip={newTip} 
            />
          </IonRow>
          <IonRow className='row'>
            <Tip 
              plant='squash' 
              plantInfo={plants.filter(plant => plant.id === 'squash')} 
              newTip={newTip} 
            />
          </IonRow>
          <IonRow className='row'>
            <Tip 
              plant='lettuce' 
              plantInfo={plants.filter(plant => plant.id === 'lettuce')} 
              newTip={newTip} 
            />
          </IonRow>
          <IonRow className='row'>
            <Tip 
              plant='peas' 
              plantInfo={plants.filter(plant => plant.id === 'peas')} 
              newTip={newTip} 
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Tips;