import React, { useState } from 'react';
import { 
  IonCol, 
  IonCard, 
  IonCardContent, 
  IonRow, 
  IonButton, 
  IonIcon, 
  IonAlert
} from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';
import { firebase } from '../../Utility/Firebase';
import './Tip.css';

interface TipProps {
  plant: string,
  plantInfo: firebase.firestore.DocumentData[];
  newTip: CallableFunction;
}

const Tip: React.FC<TipProps> = props => {
  const { plant, plantInfo, newTip } = props;
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [selectedTip, setSelectedTip] = useState<string>('');
  const plantCapitalized = plant.charAt(0).toUpperCase() + plant.slice(1);
  let tips = [];

  plantInfo.forEach(info => {
    tips = info.tips;
  });

  const deleteClicked = (tip: string) => {
    setSelectedTip(tip);
    setDeleteAlert(true);
  };

  const deleteTheTip = (tip: string) => {
    firebase
      .deleteTip(plant, tip)
      .then((msg) => {
        firebase.presentToast('The tip has been successfully deleted.');
      })
      .catch((err) => firebase.presentToast('An error occurred. The tip could not be deleted. Please try again.'))
  };

  return (
    <>
      <IonAlert 
        isOpen={deleteAlert}
        header={'Delete?'}
        message={'Are you sure you want to delete this tip?'}
        onDidDismiss={() => setDeleteAlert(false)}
        buttons={[
          {
            text: 'Cancel',
            handler: () => {
              setDeleteAlert(false);
            },
          },
          {
            text: 'Delete',
            handler: () => {
              setDeleteAlert(false);
              deleteTheTip(selectedTip);
            }
          }
        ]}
      />
      <IonCol>
        <IonRow className='title-row'>
          <IonCol size='1' className='title-col'>
            <h2 className='plant-title'>{plantCapitalized}</h2>
          </IonCol>
          <IonCol size='1' className='tip-btn-col'>
            <IonButton size='default' onClick={() => newTip(plant)}>
              <IonIcon icon={addOutline} />
              tip
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className='tips-row'>
          {tips.length !== 0 ?
            tips.map((tip, index) => (
              <IonCol size='3' key={index}>
                <IonCard className='tip-card'>
                  <IonCardContent>
                    {tip}
                  </IonCardContent>
                  <IonIcon icon={trashOutline} className='delete-tip-icon' onClick={() => deleteClicked(tip)} />
                </IonCard>
              </IonCol>
            )) 
          :
            <div className='no-tips'>
                There are currently no tips for {plant}.
                <br />
                Click the "+ tip" button to add the first tip!
            </div>
          }
        </IonRow>
      </IonCol>
    </>
  );
}

export default Tip;