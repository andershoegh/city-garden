import { IonButton } from '@ionic/react';
import React from 'react';
import './Bed.css';

interface BedProps {
  bedNr: string;
  indhold?: string;
  info?: string;
  opgave?: string;
  taget?: boolean;
  temp?: number;
  style?: string;
  setSelection: CallableFunction;
}

const Bed: React.FC<BedProps> = ({ bedNr, indhold, info, opgave, taget, style, setSelection }) => {
  let boxIllustration = indhold != null ? "gardenbox-" + indhold + " gardenbox" : "gardenbox-empty gardenbox";

  return (
    <IonButton
      className={boxIllustration}
      fill='clear'
      expand='block'
      
      onClick={() => {
        setSelection(bedNr);
        const taskElement: any = document.getElementById(bedNr + '-tasks-id');
        if (taskElement !== null) {
          taskElement.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      {bedNr}
    </IonButton>
  );
};

export default Bed;
