import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItemDivider,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { firebase } from '../../Utility/Firebase';
import './SideMenu.css';
import Task from './Task';

export interface SideMenuProps {
  tasks: firebase.firestore.DocumentData[];
  selection: string;
  setSelection: CallableFunction;
}

export const SideMenu: React.FC<SideMenuProps> = (props) => {
  const { tasks, selection, setSelection } = props;
  const [taskDescriptions, setTaskDescriptions] = useState<firebase.firestore.DocumentData[]>([]);
  const [showTaken, setShowTaken] = useState<boolean>(false);
  const [tabChosen, setTabChosen] = useState<string>('available');
  let priorBoxId = '0';

  useEffect(() => {
    const unsub = firebase.getTaskDescription().onSnapshot((snapShot) => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach((doc) => {
        tempArray = [...tempArray, { ...doc.data(), id: doc.id }];
      });
      setTaskDescriptions(tempArray);
    });

    return () => {
      unsub();
    };
  }, []);

  const toggleTab = (show: boolean) => {
    setSelection('0');
    setTabChosen(show ? 'taken' : 'available');
    setShowTaken(show);
  };

  const toggleOpen = (id: string) => {
    setSelection(id);
  };

  const toggleTask = (taskId: string, update: string, takenStatus: boolean) => {
    switch (update) {
      case 'toggleTaken':
        firebase.updateTaskTaken(taskId, !takenStatus);
        break;
      case 'setFinished':
        firebase.setTaskFinished(taskId, true);
        break;
      default:
        break;
    }
  };

  return (
    <IonCard className='card'>
      <IonCardHeader className='side-menu-header'>
        <IonSegment
          className='segment'
          value={tabChosen}
          key='segment'
          onIonChange={(e) => (e.detail.value === 'taken' ? toggleTab(true) : toggleTab(false))}
        >
          <IonSegmentButton value='available' defaultChecked>
            <IonLabel>Available</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='taken'>
            <IonLabel>Taken</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonCardHeader>

      <IonCardContent className='list' id='side-menu-list'>
        <IonItemDivider sticky={true}>
          <div className='sticky-header'>
            {tasks.filter((task) => !task.finished && task.taskTaken === showTaken).length
              ? 'These garden boxes need your help!'
              : 'No available tasks'}
          </div>
        </IonItemDivider>
        <IonList>
          {tasks
            .filter((task) => !task.finished && task.taskTaken === showTaken)
            .map((task, index) => {
              let newTab = task.gardenBoxId !== priorBoxId;
              if (newTab) {
                priorBoxId = task.gardenBoxId;
              }
              return (
                <Task
                  key={index}
                  task={task}
                  taskDescription={taskDescriptions}
                  showTaken={showTaken}
                  index={index}
                  isOpen={selection}
                  toggleOpen={toggleOpen}
                  toggleTask={toggleTask}
                  newTab={newTab}
                />
              );
            })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default SideMenu;
