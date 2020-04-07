import { IonButton, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import './Bed.css';
import { firebase } from '../Utility/Firebase';

interface BedProps {
  bedNr: string;
  content?: string;
  temp?: number;
  setSelection: CallableFunction;
}


const Bed: React.FC<BedProps> = ({ bedNr, content, setSelection }) => {
const [showAlert,setShowAlert] = useState(false);
let boxIllustration = content != null ? "gardenbox-" + content + " gardenbox" : "gardenbox-empty gardenbox";


  return (
    <IonButton
      className={boxIllustration}
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
          inputs={[{name:'plantSelection',
            type:'radio',
            label:'Peas',
            value:'peas',
            checked:true},
            {name:'plantSelection',
            type:'radio',
            label:'Carrots',
            value:'carrots'},
            {name:'plantSelection',
            type:'radio',
            label:'Squash',
            value:'squash'}
          ]}
          buttons={[{text:'Cancel',
            role:'cancel',
            cssClass:'alert-cancel'
          },
          {text:'Plant',
            handler: e => {
              firebase.updatePlant(bedNr,e)
            }
          }]}
        />
    </IonButton>
    
  );
};

export default Bed;
