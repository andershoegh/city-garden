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

const Bed: React.FC<BedProps> = ({ bedNr, setSelection }) => {
  const click = () => {
    const element = document.getElementById(bedNr + '-tasks-id');
    const parent = document.getElementById('side-menu-list');
    if (element !== null && parent !== null) {
      setSelection(bedNr);
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
    }
  };

  return (
    <IonButton className='bed-style-primary' fill='clear' expand='block' onClick={click}>
      Bed nr: {bedNr}
    </IonButton>
  );
};
export default Bed;
