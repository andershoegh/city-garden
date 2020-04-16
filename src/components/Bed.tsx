import { IonButton, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import './Bed.css';
import { firebase } from '../Utility/Firebase';

interface BedProps {
  bedNr: string;
  content?: string;
  temp?: number;
  setSelection: CallableFunction;
  selectedBox: string;
  setSelectedBox: CallableFunction;
}


const Bed: React.FC<BedProps> = ({ bedNr, content, setSelection, selectedBox, setSelectedBox }) => {
const [sow,setSow] = useState(false);
const [rootOut,setRootOut] = useState(false);
let boxIllustration = content != null ? "gardenbox-" + content + " gardenbox" : "gardenbox-empty gardenbox";

  return (
    <IonButton
      className={boxIllustration}
      fill='clear'
      expand='block'

      onClick={() => {
        setSelection(bedNr);
        setSelectedBox(bedNr);
        const taskElement: any = document.getElementById(bedNr + '-tasks-id');
        if (taskElement !== null) {
          taskElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (content === "empty"){setSow(true)}
        if (content !== "empty" && selectedBox === bedNr){setRootOut(true)}
      }}
    >
      Bed nr: {bedNr}
      <IonAlert
          isOpen={sow}
          onDidDismiss={() => setSow(false)}
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
            value:'squash'},
            {name:'plantSelection',
            type:'radio',
            label:'Potatoes',
            value:'potatoes'},
            {name:'plantSelection',
            type:'radio',
            label:'Lettuce',
            value:'lettuce'}
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
        <IonAlert
          isOpen={rootOut}
          onDidDismiss={() => setRootOut(false)}
          header={'Root Out'}
          subHeader={'Removing plant from box'}
          message={'Are you sure you want to remove the plant from the box?'}
          buttons={[{text:'Cancel',
            role:'cancel'},
            {text:'Remove',
            handler: e => {
              firebase.updatePlant(bedNr,'empty')
            }
          }]}         
          />
    </IonButton>
    
  );
};

export default Bed;
