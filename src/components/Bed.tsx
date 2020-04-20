import { IonButton, IonAlert, IonBadge } from '@ionic/react';
import React, { useState } from 'react';
import './Bed.css';
import { firebase } from '../Utility/Firebase';

interface BedProps {
  bedNr: string;
  content?: string;
  temp?: number;
  setSelection: CallableFunction;
  availTasks: number;
}

const Bed: React.FC<BedProps> = props => {
  const { bedNr, content, setSelection, availTasks } = props;
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const [showFullAlert, setShowFullAlert] = useState(false);
  let boxIllustration = content != null ? 'gardenbox-' + content + ' gardenbox' : 'gardenbox-empty gardenbox';
  const DOUBLE_CLICK_THRESHOLD = 300;
  const [touchStart, setTouchStart] = useState<number>(0);
  let message = 'This garden box contains ' + content + '. <br> Click on okay to empty garden box ' + bedNr + '.';

  const touchRelease = () => {
    const touchEnd = Date.now();

    if (Math.abs(touchEnd - touchStart) >= DOUBLE_CLICK_THRESHOLD) {
      if (content !== 'empty') { setShowFullAlert(true) }
      setTouchStart(0);
    } else {
      setSelection(bedNr);
      const taskElement: any = document.getElementById(bedNr + '-tasks-id');
      if (taskElement !== null) {
        taskElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
      }
      if (content === 'empty') { setShowEmptyAlert(true) }
      
      setTouchStart(0);
    }
  }

  return (
    <div>
    <IonButton
      className={boxIllustration}
      fill='clear'
      expand='block'
      onTouchStart={() => setTouchStart(Date.now())}
      onTouchEnd={() => touchRelease()}
    >
      {bedNr}
      <IonAlert
          isOpen={showEmptyAlert}
          onDidDismiss={() => setShowEmptyAlert(false)}
          header={'Plant'}
          subHeader={'Do you want to plant something?'}
          message={'Please select what to plant.'}
          inputs={[{
            name: 'plantSelection',
            type: 'radio',
            label: 'Peas',
            value: 'peas',
            checked: true},
            {name: 'plantSelection',
            type: 'radio',
            label: 'Carrots',
            value: 'carrots'},
            {name: 'plantSelection',
            type: 'radio',
            label: 'Squash',
            value: 'squash'},
            {name: 'plantSelection',
            type: 'radio',
            label: 'Potatoes',
            value: 'potatoes'},
            {name: 'plantSelection',
            type: 'radio',
            label: 'Lettuce',
            value: 'lettuce'}
          ]}
          buttons={[{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'alert-cancel'
          },
          {
            text: 'Plant',
            handler: e => {
              firebase.updatePlant(bedNr, e)
            }
          }]}          
        />
        <IonAlert 
          isOpen={showFullAlert}
          onDidDismiss={() => setShowFullAlert(false)}
          header='Empty'
          subHeader='Do you want to empty this garden box?'
          message={message}
          buttons={[{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'alert.cancel'
          },
          {
            text: 'Okay',
            handler: e => {
              firebase.updatePlant(bedNr, 'empty')
            }
          }
          ]}
        />
    </IonButton>
    { availTasks !== 0 ? 
      (<IonBadge className='badge'> {availTasks} </IonBadge>) 
      : (null) 
    }
    </div>
  );
};
export default Bed;
