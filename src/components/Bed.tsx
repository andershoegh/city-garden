import { IonButton, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import './Bed.css';
import { firestore } from 'firebase';

interface BedProps {
  bedNr: string;
  content?: string;
  temp?: number;
  setSelection: CallableFunction;
}

const Bed: React.FC<BedProps> = ({ bedNr, content, setSelection }) => {
  
  const [showAlert,setShowAlert] = useState(false);
  return (
    <IonButton
      className='bed-style-primary'
      fill='clear'
      expand='block'
      onClick={() => {
        console.log(content);
        setSelection(bedNr);
        const taskElement: any = document.getElementById(bedNr + '-tasks-id');
        if (taskElement !== null) {
          taskElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (content === "empty"){setShowAlert(true)}
      }}
    >
      Bed nr: {bedNr}
      <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Empty'}
          subHeader={'Do you want to plant something?'}
          message={'Please select what to plant.'}
          inputs={[{name:'Plant',
            type:'radio',
            label:'Peas',
            value:'peas',
            checked:true},
            {name:'Plant',
            type:'radio',
            label:'Carrots',
            value:'carrots'},
            {name:'Plant',
            type:'radio',
            label:'Squash',
            value:'squash'}
          ]}
          buttons={[{text:'Cancel',
            role:'cancel',
            cssClass:'alert-cancel'
          },
          {text:'Plant',
            handler:()=>{
              
            }
          }]}
        />
    </IonButton>
    
  );
};

export default Bed;
