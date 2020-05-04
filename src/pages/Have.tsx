import { IonCol, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Have.css';
import Bed from '../components/Bed';
import { firebase } from '../Utility/Firebase';

interface HaveProps {
  setSelection: CallableFunction;
  tasks: firebase.firestore.DocumentData[];
}

const Have: React.FC<HaveProps> = props => {
  const { setSelection, tasks } = props;
  const [beds, setBeds] = useState<firebase.firestore.DocumentData[]>([]);
  const sizeRow = '2';

  useEffect(() => {
    const unsub = firebase.getBed().onSnapshot((snapShot) => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach((doc) => {
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
      {beds.map((bed, index) => {
        let availTasks = 0;
        tasks.forEach(task => task.gardenBoxId === bed.id && task.taskTaken === false ? availTasks++ : null);
        return <IonCol
          size-sm={sizeRow}
          key={index}
          offset={bed.id === '19' || bed.id === '21' ? '8' : '0'}
        >
          <Bed bedNr={bed.id} 
            content={bed.plant} 
            airMoisture={bed.airMoisture}
            soilMoisture={bed.soilMoisture}
            soilTemperature={bed.soilTemperature}
            setSelection={setSelection}
            availTasks={availTasks} />
        </IonCol>
      })}
    </IonRow>
  );
};

export default Have;
