import { IonCol, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Have.css';
import Bed from '../components/Bed';
import { firebase } from '../Utility/Firebase';

interface HaveProps {
  setSelection: CallableFunction;
}

const Have: React.FC<HaveProps> = props => {
  const { setSelection } = props;
  const sizeRow = '2';

  const [beds, setBeds] = useState<firebase.firestore.DocumentData[]>([]);
  const [selectedBox,setSelectedBox] = useState("");

  useEffect(() => {
    const unsub = firebase.getBed().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, { ...doc.data(), id: doc.id }];
      });
      tempArray.sort((a: any, b: any) => Number(a.id) - Number(b.id));

      setBeds(tempArray);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <IonRow>
      {beds.map((bed, index) => (
        <IonCol
          size-sm={sizeRow}
          key={index}
          offset={bed.id === '19' || bed.id === '21' ? '8' : '0'}
        >
          <Bed bedNr={bed.id} setSelection={setSelection} content={bed.plant} selectedBox={selectedBox} setSelectedBox={setSelectedBox}></Bed>
        </IonCol>
      ))}
    </IonRow>
  );
};

export default Have;
